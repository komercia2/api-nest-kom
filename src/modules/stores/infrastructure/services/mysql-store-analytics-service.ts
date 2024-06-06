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

	async saveClickedPayCart(ids: number[], storeId: number) {
		const unrepeatedIds = new Set(ids)

		const cleanedIDs = Array.from(unrepeatedIds)

		const storeAnalytics = cleanedIDs.map((id) => ({
			id: UuidUtil.uuid,
			storeId,
			productId: id,
			event: StoreAnalyticsEvent.CLICKED_PAY_CART,
			occurredAt: new Date()
		}))

		await this.storeAnalyticsRepository.insert(storeAnalytics)
	}

	async countDevices(storeId: number) {
		const query = this.storeAnalyticsRepository
			.createQueryBuilder("storeAnalytics")
			.where("storeAnalytics.storeId = :storeId", { storeId })
			.groupBy("storeAnalytics.device")
			.select("storeAnalytics.device", "key")
			.addSelect("COUNT(storeAnalytics.device)", "value")

		const result = await query.getRawMany()

		const defaultValues = Object.values(Devices).reduce((acc, device) => {
			acc[device] = 0
			return acc
		}, {} as Record<Devices, number>)

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
