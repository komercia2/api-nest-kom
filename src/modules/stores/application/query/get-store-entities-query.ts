import { Inject, Injectable } from "@nestjs/common"

import { IStoreEntitiesRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class GetStoreEntitiesQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreEntitiesRepository)
		private storeEntitiesRepository: IStoreEntitiesRepository
	) {}

	async execute(storeId: number) {
		return await this.storeEntitiesRepository.getStoreEntities(storeId)
	}
}
