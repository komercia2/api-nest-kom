import { Inject } from "@nestjs/common"

import { StoreProductSubcategoryEntity } from "../../domain/entities"
import { IStoreProductSubcategoryRepository } from "../../domain/repositories"
import { MysqlStoreProductSubcategoryService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MysqlStoreProductSubcategoryRepository implements IStoreProductSubcategoryRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MySQLStoreProductSubcategoryService)
		private readonly storeProductSubcategoryService: MysqlStoreProductSubcategoryService
	) {}

	getStoreProductSubcategories(storeId: number): Promise<StoreProductSubcategoryEntity[]> {
		return this.storeProductSubcategoryService.getStoreProductSubcategories(storeId)
	}
}
