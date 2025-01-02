import { Inject } from "@nestjs/common"

import { StoreLogoEntity } from "../../domain/entities"
import { IStoreLogoRepository } from "../../domain/repositories/store-logo-repository"
import { MySQLStoreLogoService } from "../services/mysql-store-logo-service"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySQLStoreLogoRespository implements IStoreLogoRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MySQLStoreLogoService)
		private readonly mySQLStoreLogoService: MySQLStoreLogoService
	) {}

	async getLogo(storeID: number): Promise<StoreLogoEntity | null> {
		return await this.mySQLStoreLogoService.findStoreLogo(storeID)
	}
}
