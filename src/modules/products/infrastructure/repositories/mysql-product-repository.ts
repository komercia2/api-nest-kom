import { Inject } from "@nestjs/common"

import { IProductRepository } from "../../domain/repositories"
import { InfrastructureInjectionTokens } from "../infrastructure-injection-tokens"
import { MySQLProductService } from "../services"

export class MySQLProductRepository implements IProductRepository {
	constructor(
		@Inject(InfrastructureInjectionTokens.MySQLProductService)
		private readonly mysqlProductService: MySQLProductService
	) {}

	async getPagedProducts(storeId: number, page: number, limit: number, active: boolean) {
		return await this.mysqlProductService.getPagedProducts(storeId, page, limit, active)
	}
}
