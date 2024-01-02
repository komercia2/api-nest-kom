import { Inject } from "@nestjs/common"

import { CreateStoreAnalyticsDto } from "../../domain/dtos"
import { IStoreAnalyticsRepository } from "../../domain/repositories"
import { MySQLStoreAnalyticsService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySQLStoreAnalyticsRepository implements IStoreAnalyticsRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MySQLStoreAnalyticsService)
		private readonly storeAnalyticsService: MySQLStoreAnalyticsService
	) {}

	async save(storeAnalytics: CreateStoreAnalyticsDto): Promise<void> {
		await this.storeAnalyticsService.save(storeAnalytics)
	}
}
