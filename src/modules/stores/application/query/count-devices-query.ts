import { Inject, Injectable } from "@nestjs/common"

import { IStoreAnalyticsRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class CountDevicesQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreAnalyticsRepository)
		private readonly storeAnalyticsRepository: IStoreAnalyticsRepository
	) {}

	async execute(storeId: number): Promise<{ key: string; value: number }> {
		return this.storeAnalyticsRepository.countDevices(storeId)
	}
}
