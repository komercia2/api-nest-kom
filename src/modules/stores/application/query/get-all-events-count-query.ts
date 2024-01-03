import { Inject, Injectable } from "@nestjs/common"

import { IStoreAnalyticsRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class GetAllEventsCountQuery {
	public constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreAnalyticsRepository)
		private readonly storeAnalyticsRepository: IStoreAnalyticsRepository
	) {}

	public async execute(storeId: number) {
		return await this.storeAnalyticsRepository.countAllEvents(storeId)
	}
}
