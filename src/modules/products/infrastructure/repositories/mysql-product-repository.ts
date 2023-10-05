import { Inject } from "@nestjs/common"

import { IProductFilterDTO, IProductRepository } from "../../domain/repositories"
import { InfrastructureInjectionTokens } from "../infrastructure-injection-tokens"
import { MySQLProductService } from "../services"

export class MySQLProductRepository implements IProductRepository {
	constructor(
		@Inject(InfrastructureInjectionTokens.MySQLProductService)
		private readonly mysqlProductService: MySQLProductService
	) {}

	async getPagedProducts(input: IProductFilterDTO) {
		return await this.mysqlProductService.getPagedProducts(input)
	}
}
