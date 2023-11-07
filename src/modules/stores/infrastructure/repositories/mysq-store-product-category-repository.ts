import { Inject } from "@nestjs/common"

import { StoreProductCategoryEntity } from "../../domain/entities"
import { IStoreProductCategoryRepository } from "../../domain/repositories"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySQLStoreProductCategoryRepository implements IStoreProductCategoryRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MySQLStoreProductCategoryService)
		private readonly storeProductCategoryService: MySQLStoreProductCategoryRepository
	) {}

	async getStoreProductCategories(id: number): Promise<StoreProductCategoryEntity[]> {
		try {
			return await this.storeProductCategoryService.getStoreProductCategories(id)
		} catch (error) {
			throw error
		}
	}
}
