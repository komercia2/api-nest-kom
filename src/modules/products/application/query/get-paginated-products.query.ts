import { Inject, Injectable } from "@nestjs/common"

import { IProductRepository } from "../../domain/repositories"
import { ProductsApplicationInjectionTokens } from "../application-injection-tokens"

@Injectable()
export class GetPaginatedProductsQuery {
	constructor(
		@Inject(ProductsApplicationInjectionTokens.IProductRepository)
		private readonly productRepository: IProductRepository
	) {}

	async execute(storeId: number, page: number, limit: number, active: boolean) {
		return await this.productRepository.getPagedProducts(storeId, page, limit, active)
	}
}
