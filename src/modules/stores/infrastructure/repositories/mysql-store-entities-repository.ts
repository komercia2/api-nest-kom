import { Inject } from "@nestjs/common"

import { StoreEntitiesEntity } from "../../domain/entities"
import { IStoreEntitiesRepository } from "../../domain/repositories"
import { MySQLStoreEntitiesService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySQLStoreEntitiesRepository implements IStoreEntitiesRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MysqlStoreEntitiesService)
		private readonly storeEntitiesService: MySQLStoreEntitiesService
	) {}

	async getStoreEntities(storeId: number): Promise<StoreEntitiesEntity[]> {
		return await this.storeEntitiesService.getStoreEntities(storeId)
	}
}
