import { Inject } from "@nestjs/common"

import { StoreShippingMeanEntity } from "../../domain/entities"
import { IStoreShippingMeansRepository } from "../../domain/repositories"
import { MysqlStoreShippingMeansService } from "../services/mysql-store-shipping-means-service"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySQLStoreShippingMeansRepository implements IStoreShippingMeansRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MySQLStoreShippingMeansService)
		private readonly mysqlStoreShippingMeansService: MysqlStoreShippingMeansService
	) {}

	async getStoreShippingMeans(storeId: number): Promise<StoreShippingMeanEntity> {
		return this.mysqlStoreShippingMeansService.getStoreShippingMeans(storeId)
	}
}
