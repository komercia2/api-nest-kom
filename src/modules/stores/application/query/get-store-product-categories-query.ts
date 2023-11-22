import { Inject, Injectable } from "@nestjs/common"

import { IStoreProductCategoryRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class GetStoreProductCategoriesQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreProductCategoryRepository)
		private readonly repository: IStoreProductCategoryRepository
	) {}

	async execute(id: number) {
		try {
			return await this.repository.getStoreProductCategories(id)
		} catch (error) {
			throw error
		}
	}
}
