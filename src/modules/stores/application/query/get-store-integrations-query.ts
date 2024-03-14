import { Inject, Injectable } from "@nestjs/common"

import { IStoreIntegrationsRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class GetStoreIntegrationsQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreIntegrationsRepository)
		private storeIntegrationsRepository: IStoreIntegrationsRepository
	) {}

	async execute(storeId: number) {
		return this.storeIntegrationsRepository.getStoreIntegrations(storeId)
	}
}
