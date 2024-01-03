import { Inject, Injectable } from "@nestjs/common"

import { GetFilteredStoreAnalyticsDto } from "../../domain/dtos"
import { IStoreAnalyticsRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class GetFilteredStoreAnalyticsQuery {
	public constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreAnalyticsRepository)
		private readonly storeAnalyticsRepository: IStoreAnalyticsRepository
	) {}

	public async execute(storeId: number, filter: GetFilteredStoreAnalyticsDto) {
		return await this.storeAnalyticsRepository.getFiltered(storeId, filter)
	}
}
