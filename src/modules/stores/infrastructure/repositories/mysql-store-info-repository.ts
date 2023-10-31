import { Inject } from "@nestjs/common"
import { Tiendas } from "src/entities"

import { IStoreInfoRepository } from "../../domain/repositories"
import { MySQLStoreInfoService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySQLStoreInfoRepository implements IStoreInfoRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MysqlStoreInfoService)
		private readonly storeInfoService: MySQLStoreInfoService
	) {}

	async getStoreInfo(storeId: number): Promise<Tiendas | null> {
		return await this.storeInfoService.getStoreInfo(storeId)
	}
}
