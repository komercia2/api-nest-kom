import { Inject } from "@nestjs/common"

import { StoreIntegrationEntity } from "../../domain/entities"
import { IStoreIntegrationsRepository } from "../../domain/repositories"
import { MySqlStoreIntegrationsService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySqlStoreIntegrationsRepository implements IStoreIntegrationsRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MysqlStoreIntegrationsService)
		private readonly mysqlStoreIntegrationsService: MySqlStoreIntegrationsService
	) {}

	async getStoreIntegrations(storeId: number): Promise<StoreIntegrationEntity[]> {
		return this.mysqlStoreIntegrationsService.getStoreIntegrations(storeId)
	}
}
