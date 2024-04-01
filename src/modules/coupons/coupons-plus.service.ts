import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { StoresCouponsPlus } from "src/entities"
import { Repository } from "typeorm"

import { CreateDiscountCouponDto } from "./dtos/crete-discount-coupon.dto"
import { FindAllDiscountCouponsDto } from "./dtos/find-all-discount-coupons.dto"
import { RedeemDiscountCouponDto } from "./dtos/redeem-discount-coupon.dto"
import { UpdateDiscountCouponDto } from "./dtos/update-coupons.dto"

@Injectable()
export class CouponsPlusService {
	constructor(
		@InjectRepository(StoresCouponsPlus)
		private readonly couponsPlusRepository: Repository<StoresCouponsPlus>
	) {}

	async updateCoupon(updateCouponDto: UpdateDiscountCouponDto, storeId: number, coupon: string) {
		const couponExists = await this.findCoupon(coupon, storeId)

		if (!couponExists) throw new BadRequestException("Coupon not found")

		const currentDate = new Date()

		try {
			await this.couponsPlusRepository.update(
				{ id: couponExists.id, store_id: storeId },
				{
					...updateCouponDto,
					updated_at: currentDate
				}
			)
			return { message: "Coupon updated successfully", success: true }
		} catch (error) {
			throw new InternalServerErrorException("Error updating coupon")
		}
	}

	async deactivateCoupon(coupon: string, storeId: number) {
		const couponExists = await this.findValidCoupon(coupon, storeId)

		const currentDate = new Date()

		try {
			await this.couponsPlusRepository.update(
				{ id: couponExists.id, store_id: storeId },
				{
					status: 0,
					deleted_at: currentDate,
					updated_at: currentDate
				}
			)
			return { message: "Coupon deactivated successfully", success: true }
		} catch (error) {
			throw new InternalServerErrorException("Error deactivating coupon")
		}
	}

	async redeemCoupon(redeemDiscountCouponDto: RedeemDiscountCouponDto) {
		const { coupon, storeId } = redeemDiscountCouponDto

		const couponExists = await this.findValidCoupon(coupon, storeId)

		const { id: couponID, claim_limit } = couponExists

		const newClaimLimit = claim_limit - 1

		if (newClaimLimit < 0) throw new BadRequestException("Coupon has reached its claim limit")

		const currentDate = new Date()

		try {
			await this.couponsPlusRepository.update(
				{ id: couponID, store_id: storeId },
				{
					claimed_at: currentDate,
					status: 0,
					claim_limit: newClaimLimit
				}
			)
			return { message: "Coupon redeemed successfully", success: true }
		} catch (error) {
			throw new InternalServerErrorException("Error redeeming coupon")
		}
	}

	async findAllCoupons(findAllDiscountCouponsDto: FindAllDiscountCouponsDto) {
		const { store_id, page, limit, status, type, coupon, product, user } = findAllDiscountCouponsDto

		const query = this.couponsPlusRepository
			.createQueryBuilder("coupons")
			.leftJoin("coupons.product", "product")
			.leftJoin("coupons.user", "user")
			.leftJoin("user.ciudad2", "ciudad")
			.where("coupons.store_id = :store_id", { store_id })
			.select([
				"coupons.id",
				"coupons.coupon",
				"coupons.status",
				"coupons.type",
				"coupons.percentage_value",
				"coupons.fixed_price_value",
				"coupons.public",
				"coupons.claim_limit",
				"coupons.expiration_date",
				"coupons.created_at",
				"coupons.updated_at",
				"coupons.deleted_at",
				"coupons.client_id",
				"coupons.claimed_at",
				"product.id",
				"product.nombre",
				"product.fotoCloudinary",
				"product.precio",
				"product.activo",
				"product.envioGratis",
				"user.id",
				"user.nombre",
				"user.email",
				"ciudad.nombreCiu"
			])
			.orderBy("coupons.created_at", "DESC")
			.andWhere("coupons.deleted_at IS NULL")
			.skip((page - 1) * limit)
			.take(limit)

		if (status) query.andWhere("coupons.status = :status", { status })
		if (type) query.andWhere("coupons.type = :type", { type })
		if (coupon) query.andWhere("coupons.coupon LIKE :coupon", { coupon: `%${coupon}%` })
		if (product) query.andWhere("product.nombre LIKE :product", { product: `%${product}%` })
		if (user) query.andWhere("user.nombre LIKE :user", { user: `%${user}%` })

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

	async createCoupon(coupon: CreateDiscountCouponDto) {
		const { coupon: couponCode, store_id } = coupon

		const couponExists = await this.findCoupon(couponCode, store_id)

		if (couponExists) throw new BadRequestException("Coupon already exists for this store")

		try {
			const newCoupon = this.couponsPlusRepository.create(coupon)
			return await this.couponsPlusRepository.save({
				...newCoupon,
				created_at: new Date(),
				product: { id: coupon.product_id ?? null },
				user: { id: coupon.client_id ?? null },
				store: { id: coupon.store_id }
			})
		} catch (error) {
			throw new InternalServerErrorException("Error creating coupon")
		}
	}

	async findValidCoupon(coupon: string, storeId: number) {
		const couponExists = await this.findCoupon(coupon, storeId)

		if (!couponExists) throw new BadRequestException("Coupon not found")

		const currentDate = new Date()
		const { expiration_date, status, claimed_at, deleted_at } = couponExists

		if (status !== 1) throw new BadRequestException("Coupon is not active")
		if (expiration_date && expiration_date < currentDate) {
			throw new BadRequestException("Coupon has expired")
		}
		if (claimed_at) throw new BadRequestException("Coupon has already been claimed")
		if (deleted_at) throw new BadRequestException("Coupon has been deleted")

		return couponExists
	}

	async findCoupon(coupon: string, storeId: number) {
		return await this.couponsPlusRepository.findOne({ where: { coupon, store_id: storeId } })
	}
}
