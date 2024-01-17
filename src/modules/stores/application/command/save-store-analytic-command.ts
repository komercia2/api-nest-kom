import { Inject, Injectable } from "@nestjs/common"

import { CreateStoreAnalyticsDto } from "../../domain/dtos"
import { IStoreAnalyticsRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class SaveStoreAnalyticCommand {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreAnalyticsRepository)
		private readonly storeAnalyticsRepository: IStoreAnalyticsRepository
	) {}

	async execute(storeAnalytics: CreateStoreAnalyticsDto) {
		await this.storeAnalyticsRepository.save(storeAnalytics)
	}
}
