import { Inject, Injectable } from "@nestjs/common"

import { IStoreExternalApiRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class GetStoreExternalApisQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreExternalApiRepository)
		private readonly storeExternalApiRepository: IStoreExternalApiRepository
	) {}

	async execute(storeId: number) {
		return await this.storeExternalApiRepository.getStoreExternalApis(storeId)
	}
}
