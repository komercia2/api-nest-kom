import { Inject, Injectable } from "@nestjs/common"

import { IStoreInfoRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class GetStoreInfoQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreInfoRepository)
		private readonly storeInfoRepository: IStoreInfoRepository
	) {}

	async execute(storeId: number) {
		return await this.storeInfoRepository.getStoreInfo(storeId)
	}
}
