import { Inject } from "@nestjs/common"

import { CreateStoreAnalyticsDto, GetFilteredStoreAnalyticsDto } from "../../domain/dtos"
import { StoreAnalyticsEntity } from "../../domain/entities"
import { IStoreAnalyticsRepository } from "../../domain/repositories"
import { MySQLStoreAnalyticsService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySQLStoreAnalyticsRepository implements IStoreAnalyticsRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MySQLStoreAnalyticsService)
		private readonly storeAnalyticsService: MySQLStoreAnalyticsService
	) {}
	async getFiltered(
		storeId: number,
		filter: GetFilteredStoreAnalyticsDto
	): Promise<StoreAnalyticsEntity[]> {
		return await this.storeAnalyticsService.getFiltered(storeId, filter)
	}

	async save(storeAnalytics: CreateStoreAnalyticsDto): Promise<void> {
		await this.storeAnalyticsService.save(storeAnalytics)
	}
}
