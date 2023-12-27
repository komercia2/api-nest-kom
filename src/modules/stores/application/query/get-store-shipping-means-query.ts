import { Inject, Injectable } from "@nestjs/common"

import { IStoreShippingMeansRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class GetStoreShippingMeansQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreShippingMeansRepository)
		private repository: IStoreShippingMeansRepository
	) {}

	async execute(storeId: number) {
		return await this.repository.getStoreShippingMeans(storeId)
	}
}
