import { Inject, Injectable } from "@nestjs/common"

import { IStoreAnalyticsRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class SaveClickedPayCartCommand {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreAnalyticsRepository)
		private readonly storeAnalyticsRepository: IStoreAnalyticsRepository
	) {}

	async execute(ids: number[], storeId: number): Promise<void> {
		await this.storeAnalyticsRepository.saveClickedPayCart(ids, storeId)
	}
}
