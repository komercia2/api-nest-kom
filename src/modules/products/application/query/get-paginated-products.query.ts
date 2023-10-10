import { Inject, Injectable } from "@nestjs/common"

import { IProductFilterDTO, IProductRepository } from "../../domain/repositories"
import { ProductsApplicationInjectionTokens } from "../application-injection-tokens"

@Injectable()
export class GetPaginatedProductsQuery {
	constructor(
		@Inject(ProductsApplicationInjectionTokens.IProductRepository)
		private readonly productRepository: IProductRepository
	) {}

	async execute(data: IProductFilterDTO) {
		return await this.productRepository.getPagedProducts(data)
	}
}
