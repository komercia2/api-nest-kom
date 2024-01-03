import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UuidUtil } from "@shared/infrastructure/utils"
import { StoreAnalytics } from "src/entities"
import { Repository } from "typeorm"

import { CreateStoreAnalyticsDto, GetFilteredStoreAnalyticsDto } from "../../domain/dtos"
import { StoreAnalyticsEntity, StoreAnalyticsEvent } from "../../domain/entities"

@Injectable()
export class MySQLStoreAnalyticsService {
	constructor(
		@InjectRepository(StoreAnalytics)
		private readonly storeAnalyticsRepository: Repository<StoreAnalytics>
	) {}

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
