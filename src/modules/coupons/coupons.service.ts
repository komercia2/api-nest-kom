import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UuidUtil } from "@shared/infrastructure/utils"
import { Logger } from "nestjs-pino"
import { SubscriptionCoupon, Tiendas } from "src/entities"
import { DataSource, Repository } from "typeorm"

import { CreateSubscriptionCouponDto } from "./dtos/create-coupon.dto"
import { FilterSubscriptionCouponsDto } from "./dtos/filter-subscription-cuopons"
import { RedeemCouponDto } from "./dtos/redeem-coupon.dto"

@Injectable()
export class CouponsService {
	constructor(
		@InjectRepository(SubscriptionCoupon)
		private readonly subscriptionCouponRepository: Repository<SubscriptionCoupon>,

		@InjectRepository(Tiendas)
		private readonly tiendasRepository: Repository<Tiendas>,

		private readonly datasource: DataSource,

		private readonly logger: Logger
	) {}

	async redeemCoupon(redeemCouponDto: RedeemCouponDto) {
		const queryRunner = this.datasource.createQueryRunner()
		await queryRunner.connect()
		await queryRunner.startTransaction()

		this.logger.log("Redeem coupon transaction started")

		const { coupon, storeId } = redeemCouponDto

		try {
			const [storeExists, couponExists, storeHasCoupon] = await Promise.all([
				this.findStore(storeId),
				this.findCoupon(coupon),
				this.findStoreCoupon(storeId)
			])

			if (!storeExists) throw new ConflictException("Store does not exists")
			if (!couponExists) throw new ConflictException("Coupon already used")
			if (storeHasCoupon) throw new ConflictException("Store already has a coupon")

			const { available, storeId: store, usedAt, plan, validMonths } = couponExists

			if (available === 0) throw new ConflictException("Coupon already used")
			if (usedAt) throw new ConflictException("Coupon already used")
			if (store) throw new ConflictException("Coupon already used")

			storeExists.tipo = plan
			storeExists.fechaExpiracion = this.calculateExpirationDate(validMonths).toISOString()

			couponExists.storeId = storeId
			couponExists.usedAt = new Date()
			couponExists.available = 0

			await Promise.all([
				this.tiendasRepository.save(storeExists),
				this.subscriptionCouponRepository.save(couponExists)
			])

			await queryRunner.commitTransaction()
			this.logger.log(`Coupon redeemed successfully for store ${storeId}`)

			return {
				message: "Coupon redeemed successfully",
				storeId: storeExists.id,
				plan: storeExists.tipo,
				expirationDate: storeExists.fechaExpiracion
			}
		} catch (error) {
			await queryRunner.rollbackTransaction()
			this.logger.error("Error redeeming coupon")
			this.logger.error(error)
			if (error instanceof ConflictException) throw error
			throw new InternalServerErrorException("Error redeeming coupon")
		} finally {
			await queryRunner.release()
			this.logger.log("Redeem coupon transaction ended")
		}
	}

	private calculateExpirationDate(validMonths: number) {
		const expirationDate = new Date()
		expirationDate.setMonth(expirationDate.getMonth() + validMonths)
		return expirationDate
	}

	async createCoupon(createCouponDto: CreateSubscriptionCouponDto) {
		try {
			const coupon = this.generateRandomCoupon()
			const couponExists = await this.findCoupon(coupon)

			if (couponExists) throw new ConflictException("Coupon genarated already exists")

			const couponGenerated = await this.createCouponEntity(createCouponDto, coupon)
			const couponSaved = await this.subscriptionCouponRepository.save(couponGenerated)

			return couponSaved
		} catch (error) {
			throw new InternalServerErrorException("Error creating coupon")
		}
	}

	async createCouponEntity(createCouponDto: CreateSubscriptionCouponDto, coupon: string) {
		const { plan, validMonths, available } = createCouponDto

		const couponEntity = new SubscriptionCoupon()
		couponEntity.id = UuidUtil.uuid
		couponEntity.coupon = coupon // {0: Emprendedor, 3: Anual, 9: Mensual}
		couponEntity.available = available
		couponEntity.plan = plan
		couponEntity.validMonths = validMonths
		couponEntity.createdAt = new Date()

		return couponEntity
	}

	async findStore(storeId: number) {
		return this.tiendasRepository.findOneBy({ id: storeId })
	}

	async findStoreCoupon(storeId: number) {
		return this.subscriptionCouponRepository.findOne({ where: { storeId } })
	}

	async findCoupon(coupon: string) {
		return this.subscriptionCouponRepository.findOne({ where: { coupon } })
	}

	async findStoreCoupons(storeId: number) {
		return this.subscriptionCouponRepository.findOne({ where: { storeId } })
	}

	async storeHasCoupon(storeId: number) {
		const exists = await this.subscriptionCouponRepository.exist({ where: { storeId } })
		return { exists }
	}

	async isCouponAvailable(coupon: string) {
		const couponExists = await this.findCoupon(coupon)
		if (!couponExists) throw new ConflictException("Coupon does not exists")

		const { available, usedAt, storeId } = couponExists
		if (available === 0) return { available: false }
		if (usedAt) return { available: false }
		if (storeId) return { available: false }

		return { available: true }
	}

	generateRandomCoupon() {
		const requiredPrefix = "K0MERCIA"
		const currenYear = new Date().getFullYear()
		const randomCoupon = Math.random().toString(36).substring(2, 20)

		const coupon = `${requiredPrefix}-${currenYear}-${randomCoupon}`

		return coupon.toUpperCase()
	}

	async getFilteresCoupons(filter: FilterSubscriptionCouponsDto) {
		const { page, limit, storeId, coupon, plan, avaible } = filter

		const query = this.subscriptionCouponRepository
			.createQueryBuilder("subscriptionCoupon")
			.select([
				"subscriptionCoupon.id",
				"subscriptionCoupon.coupon",
				"subscriptionCoupon.plan",
				"subscriptionCoupon.available",
				"subscriptionCoupon.validMonths",
				"subscriptionCoupon.createdAt",
				"subscriptionCoupon.usedAt",
				"subscriptionCoupon.storeId"
			])
			.skip((page - 1) * limit)
			.take(limit)

		if (storeId) query.andWhere("subscriptionCoupon.storeId = :storeId", { storeId })
		if (coupon) query.andWhere("subscriptionCoupon.coupon = :coupon", { coupon })
		if (plan) query.andWhere("subscriptionCoupon.plan = :plan", { plan })
		if (avaible) query.andWhere("subscriptionCoupon.available = :avaible", { avaible })

		const [result, total] = await query.getManyAndCount()

		return {
			data: result,
			pagination: {
				total: Math.ceil(total / limit),
				page: +page,
				limit: +limit,
				hasPrev: page > 1,
				hasNext: page < Math.ceil(total / limit)
			}
		}
	}
}
