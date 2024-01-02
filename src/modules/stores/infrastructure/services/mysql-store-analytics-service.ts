import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UuidUtil } from "@shared/infrastructure/utils"
import { StoreAnalytics } from "src/entities"
import { Repository } from "typeorm"

import { CreateStoreAnalyticsDto } from "../../domain/dtos"
import { StoreAnalyticsEntity } from "../../domain/entities"

@Injectable()
export class MySQLStoreAnalyticsService {
	constructor(
		@InjectRepository(StoreAnalytics)
		private readonly storeAnalyticsRepository: Repository<StoreAnalytics>
	) {}

	async save(storeAnalytics: CreateStoreAnalyticsDto) {
		const storeAnalytic = StoreAnalyticsEntity.create(storeAnalytics)

		await this.storeAnalyticsRepository.save({
			id: UuidUtil.uuid,
			...storeAnalytic,
			occurredAt: new Date()
		})
	}
}
