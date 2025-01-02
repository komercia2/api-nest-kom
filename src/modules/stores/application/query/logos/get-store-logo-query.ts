import { Inject, Injectable } from "@nestjs/common"
import { StoreLogoEntity } from "src/modules/stores/domain/entities"
import { IStoreLogoRepository } from "src/modules/stores/domain/repositories/store-logo-repository"

import { StoresApplicationInjectionTokens } from "../../stores-application-injection-tokens"

@Injectable()
export class GetStoreLogoQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreLogoRepository)
		private readonly storeLogoRepository: IStoreLogoRepository
	) {}

	async execute(storeID: number): Promise<StoreLogoEntity | null> {
		return this.storeLogoRepository.getLogo(storeID)
	}
}
