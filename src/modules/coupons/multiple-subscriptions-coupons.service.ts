import { ConflictException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import {
	MultipleSubscriptionCoupon,
	MultipleSubscriptionCouponToStore,
	Tiendas
} from "src/entities"
import { Repository } from "typeorm"

import { CreateMultipleSubscriptionCouponDto } from "./dtos/create-multiple-subscription-coupon.dto"
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
