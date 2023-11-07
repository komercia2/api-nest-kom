import { Inject, Injectable } from "@nestjs/common"

import { IStoreProductSubcategoryRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class GetStoreProductSubcategoriesQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreProductSubcategoryRepository)
		private readonly storeProductSubcategoryRepository: IStoreProductSubcategoryRepository
	) {}

	async execute(storeId: number) {
		return await this.storeProductSubcategoryRepository.getStoreProductSubcategories(storeId)
	}
}
