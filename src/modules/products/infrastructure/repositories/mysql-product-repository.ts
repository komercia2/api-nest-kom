import { Inject } from "@nestjs/common"
import { Productos } from "src/entities"

import { IProductFilterDTO, IProductRepository } from "../../domain/repositories"
import { InfrastructureInjectionTokens } from "../infrastructure-injection-tokens"
import { MySQLProductService } from "../services"

export class MySQLProductRepository implements IProductRepository {
	constructor(
		@Inject(InfrastructureInjectionTokens.MySQLProductService)
		private readonly mysqlProductService: MySQLProductService
	) {}

	async createFromFile(storeId: number, file: Express.Multer.File): Promise<void> {
		await this.mysqlProductService.createFromFile(storeId, file)
	}

	async getProductBySlug(slug: string): Promise<Productos | null> {
		return await this.mysqlProductService.getProductBySlug(slug)
	}

	async getPagedProducts(input: IProductFilterDTO) {
		return await this.mysqlProductService.getPagedProducts(input)
	}
}
