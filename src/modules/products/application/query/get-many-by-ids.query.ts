import { BadRequestException, Inject, Injectable } from "@nestjs/common"

import { IProductRepository } from "../../domain/repositories"
import { ProductsApplicationInjectionTokens } from "../application-injection-tokens"

@Injectable()
export class GetManyByIdsQuery {
	constructor(
		@Inject(ProductsApplicationInjectionTokens.IProductRepository)
		private readonly productRepository: IProductRepository
	) {}

	async execute(storeId: number, ids: number[]) {
		const nonRepeatedIds = this.clearIds(ids)

		return await this.productRepository.getManyByIds(storeId, nonRepeatedIds)
	}

	private clearIds(ids: number[]) {
		const nonRepeatedIds = [...new Set(ids)]

		return nonRepeatedIds
	}
}
