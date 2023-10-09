import { Inject, Injectable } from "@nestjs/common"

import { IProductRepository } from "../../domain/repositories"
import { ProductsApplicationInjectionTokens } from "../application-injection-tokens"

@Injectable()
export class GetProductBySlugQuery {
	constructor(
		@Inject(ProductsApplicationInjectionTokens.IProductRepository)
		private readonly productRepository: IProductRepository
	) {}

	async execute(slug: string) {
		return await this.productRepository.getProductBySlug(slug)
	}
}
