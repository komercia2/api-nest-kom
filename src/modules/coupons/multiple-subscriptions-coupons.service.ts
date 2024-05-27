import { ConflictException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import {
	MultipleSubscriptionCoupon,
	MultipleSubscriptionCouponToStore,
	Tiendas
} from "src/entities"
import { Repository } from "typeorm"

import { CreateMultipleSubscriptionCouponDto } from "./dtos/create-multiple-subscription-coupon.dto"
import { FilterSubscriptionCouponsDto } from "./dtos/filter-subscription-cuopons"
import { RedeemMultipleSubscriptionDto } from "./dtos/redeem-multiple-subscription.dto"

@Injectable()
export class MultipleSubscriptionCouponsService {
	private readonly COUPON_PREFIX = "KOMERCIA-CODE-"

	constructor(
		@InjectRepository(MultipleSubscriptionCoupon)
		private readonly multipleSubscriptionCouponsRepository: Repository<MultipleSubscriptionCoupon>,
		@InjectRepository(MultipleSubscriptionCouponToStore)
		private readonly multipleSubscriptionCouponToStoreRepository: Repository<MultipleSubscriptionCouponToStore>,
		@InjectRepository(Tiendas) private readonly tiendasRepository: Repository<Tiendas>
	) {}

	async isCouponAvailable(coupon: string) {
		const couponOnDb = await this.multipleSubscriptionCouponsRepository.findOne({
			where: { coupon }
		})
		return { available: !!couponOnDb && couponOnDb.amount > 0 }
	}

	async findAll(filterSubscriptionCouponsDto: FilterSubscriptionCouponsDto) {
		const { page, limit, avaible, validMonths, plan, amount, coupon } = filterSubscriptionCouponsDto
		const skip = (page - 1) * limit

		const query = this.multipleSubscriptionCouponsRepository
			.createQueryBuilder("coupon")
			.skip(skip)
			.take(limit)

		if (coupon) query.andWhere("coupon.coupon = :coupon", { coupon })
		if (avaible) query.andWhere("coupon.available > 0")
		if (validMonths) query.andWhere("coupon.validMonths = :validMonths", { validMonths })
		if (plan) query.andWhere("coupon.plan = :plan", { plan })
		if (amount) query.andWhere("coupon.amount = :amount", { amount })

		const [coupons, total] = await query.getManyAndCount()

		return {
			data: coupons,
			pagination: {
				total: Math.ceil(total / limit),
				page: +page,
				limit: +limit,
				hasPrev: page > 1,
				hasNext: page < Math.ceil(total / limit)
			}
		}
	}

	async redeem(redeemMultipleSubscriptionDto: RedeemMultipleSubscriptionDto): Promise<void> {
		const { storeId, coupon } = redeemMultipleSubscriptionDto

		const storeHasCoupon = await this.lookupIfStoreHasCoupon(storeId)
		const couponOnDb = await this.lookupExistingCoupon(coupon)

		if (!couponOnDb) throw new ConflictException("Coupon not found")
		if (storeHasCoupon) throw new ConflictException("Store already has a coupon")
		if (couponOnDb.available === 0) throw new ConflictException("Coupon is not available")

		const canRedeem = this.storeCanRedeemCoupon(couponOnDb.amount)

		if (!canRedeem) throw new ConflictException("Coupon reached its limit")

		const newExpirationDate = this.getExpirationDate(couponOnDb.validMonths).toISOString()

		await Promise.all([
			this.multipleSubscriptionCouponsRepository.decrement({ coupon }, "amount", 1),
			this.multipleSubscriptionCouponToStoreRepository.insert({
				storeId,
				couponId: couponOnDb.id,
				redimed_at: new Date().toISOString()
			}),
			await this.tiendasRepository.update({ id: storeId }, { fechaExpiracion: newExpirationDate })
		])
	}

	getExpirationDate(validMonths: number) {
		const expirationDate = new Date()
		expirationDate.setMonth(expirationDate.getMonth() + validMonths)
		return expirationDate
	}

	isMultipleSubscriptionCoupon(coupon: string) {
		return coupon.startsWith(this.COUPON_PREFIX)
	}

	private storeCanRedeemCoupon(couponQuantity: number) {
		return couponQuantity - 1 >= 0
	}

	private async lookupIfStoreHasCoupon(storeId: number) {
		return await this.multipleSubscriptionCouponToStoreRepository.findOne({
			where: { storeId },
			relations: ["coupon"]
		})
	}

	async createCoupon(
		createMultipleSubscriptionCouponDto: CreateMultipleSubscriptionCouponDto
	): Promise<MultipleSubscriptionCoupon> {
		const { quantity, available, plan, validMonths } = createMultipleSubscriptionCouponDto

		const coupon = this.generateCouponCode()

		const existingCoupon = await this.lookupExistingCoupon(coupon)

		if (existingCoupon) throw new ConflictException("Coupon already exists")

		const newCoupon = this.multipleSubscriptionCouponsRepository.create({
			coupon,
			amount: quantity,
			plan,
			validMonths,
			available
		})

		return await this.multipleSubscriptionCouponsRepository.save(newCoupon)
	}

	private async lookupExistingCoupon(coupon: string) {
		return await this.multipleSubscriptionCouponsRepository.findOne({ where: { coupon: coupon } })
	}

	private generateCouponCode(): string {
		return `${this.COUPON_PREFIX}${Math.random().toString(36).substring(2, 12).toUpperCase()}`
	}
}
