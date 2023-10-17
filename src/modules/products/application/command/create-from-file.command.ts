import { Inject, Injectable } from "@nestjs/common"

import { IProductRepository } from "../../domain/repositories"
import { ProductsApplicationInjectionTokens } from "../application-injection-tokens"

@Injectable()
export class CreateFromFileCommand {
	constructor(
		@Inject(ProductsApplicationInjectionTokens.IProductRepository)
		private readonly productRepository: IProductRepository
	) {}

	async execute(storeId: number, file: Express.Multer.File): Promise<void> {
		await this.productRepository.createFromFile(storeId, file)
	}
}
