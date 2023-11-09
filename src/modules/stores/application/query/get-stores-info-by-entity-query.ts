import { Inject, Injectable } from "@nestjs/common"

import { IStoreInfoRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class GetStoresInfoByEntityQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreInfoRepository)
		private readonly repository: IStoreInfoRepository
	) {}

	async execute(storeId: number) {
		return await this.repository.getStoresInfoByEntityId(storeId)
	}
}
