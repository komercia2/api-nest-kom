import { Inject, Injectable } from "@nestjs/common"

import { IProductRepository } from "../../domain/repositories"
import { ProductsApplicationInjectionTokens } from "../application-injection-tokens"

@Injectable()
export class GetProductDescriptionQuery {
	constructor(
		@Inject(ProductsApplicationInjectionTokens.IProductRepository)
		private readonly productRepository: IProductRepository
	) {}

	async execute(slug: string): Promise<string | null> {
		return await this.productRepository.getProductDescription(slug)
	}
}
