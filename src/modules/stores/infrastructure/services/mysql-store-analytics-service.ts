import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UuidUtil } from "@shared/infrastructure/utils"
import { StoreAnalytics } from "src/entities"
import { Repository } from "typeorm"

import { CreateStoreAnalyticsDto, GetFilteredStoreAnalyticsDto } from "../../domain/dtos"
import { Devices, StoreAnalyticsEntity, StoreAnalyticsEvent } from "../../domain/entities"

@Injectable()
export class MySQLStoreAnalyticsService {
	constructor(
		@InjectRepository(StoreAnalytics)
		private readonly storeAnalyticsRepository: Repository<StoreAnalytics>
	) {}

	async saveClickedPayCart(ids: [{ productId: number; units: number }], storeId: number) {
		const containsNaN = ids.some(({ productId, units }) => isNaN(productId) || isNaN(units))

		if (containsNaN) return

		const storeAnalytics = ids.map(({ productId, units }) => {
			const analytic = new StoreAnalytics()

			analytic.id = UuidUtil.uuid
			analytic.storeId = +storeId
			analytic.productId = +productId
			analytic.units = +units
			analytic.event = StoreAnalyticsEvent.ADDED_PRODUCT_TO_CART
			analytic.occurredAt = new Date()

			return analytic
		})

		await this.storeAnalyticsRepository.save(storeAnalytics)
	}

	async countDevices(storeId: number) {
		const event = "VISITED_PAGE"

		const query = this.storeAnalyticsRepository
			.createQueryBuilder("storeAnalytics")
			.where("storeAnalytics.storeId = :storeId", { storeId })
			.andWhere("storeAnalytics.event = :event", { event })
			.groupBy("storeAnalytics.device")
			.select("storeAnalytics.device", "key")
			.addSelect("COUNT(storeAnalytics.device)", "value")

		const result = await query.getRawMany()

		const defaultValues: Record<Devices, number> = {
			[Devices.DESKTOP]: 0,
			[Devices.MOBILE]: 0,
			[Devices.TABLET]: 0,
			[Devices.OTHER]: 0
		}

		const mergedResult = result.reduce((acc, curr) => {
			acc[curr.key] = Number(curr.value)
			return acc
		}, defaultValues)

		return mergedResult
	}

	async countAllEvents(storeId: number) {
		const allEvents = Object.values(StoreAnalyticsEvent)

		const query = this.storeAnalyticsRepository
			.createQueryBuilder("storeAnalytics")
			.where("storeAnalytics.storeId = :storeId", { storeId })
			.groupBy("storeAnalytics.event")
			.select("storeAnalytics.event", "key")
			.addSelect("COUNT(storeAnalytics.event)", "value")

		const result = await query.getRawMany()

		const defaultValues: Record<StoreAnalyticsEvent, number> = allEvents.reduce((acc, event) => {
			acc[event] = 0
			return acc
		}, {} as Record<StoreAnalyticsEvent, number>)

		const mergedResult = result.reduce((acc, curr) => {
			acc[curr.key] = Number(curr.value)
			return acc
		}, defaultValues)

		return mergedResult
	}

	async getFiltered(
		storeId: number,
		filter: GetFilteredStoreAnalyticsDto
	): Promise<StoreAnalyticsEntity[]> {
		const { startDate, endDate, event, categoryId, device, productId, mostRecent } = filter

		const query = this.storeAnalyticsRepository
			.createQueryBuilder("storeAnalytics")
			.where("storeAnalytics.storeId = :storeId", { storeId })
			.andWhere("storeAnalytics.event = :event", { event })
			.orderBy("storeAnalytics.occurredAt", mostRecent ? "DESC" : "ASC")

		if (startDate) {
			query.andWhere("storeAnalytics.occurredAt >= :startDate", { startDate })
		}

		if (endDate) {
			query.andWhere("storeAnalytics.occurredAt <= :endDate", { endDate })
		}

		if (categoryId) {
			query.andWhere("storeAnalytics.categoryId)", { categoryId })
		}

		if (device) {
			query.andWhere("storeAnalytics.device = :device", { device })
		}

		if (productId) {
			query
				.andWhere("storeAnalytics.productId = :productId", { productId })
				.innerJoinAndSelect("storeAnalytics.Productos", "product")
		}

		const analytics = await query.getMany()

		return analytics.map((analytic) =>
			StoreAnalyticsEntity.create({ ...analytic, event: analytic.event as StoreAnalyticsEvent })
		)
	}

	async save(storeAnalytics: CreateStoreAnalyticsDto) {
		const storeAnalytic = StoreAnalyticsEntity.create(storeAnalytics)

		await this.storeAnalyticsRepository.save({
			id: UuidUtil.uuid,
			...storeAnalytic,
			occurredAt: new Date()
		})
	}
}
