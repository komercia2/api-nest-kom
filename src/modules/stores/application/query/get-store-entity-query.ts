import { Inject, Injectable } from "@nestjs/common"

import { IStoreInfoRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class GetStoreEntityQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreInfoRepository)
		private storeInfoRepository: IStoreInfoRepository
	) {}

	async execute(storeId: number) {
		return await this.storeInfoRepository.getStoreEntity(storeId)
	}
}
