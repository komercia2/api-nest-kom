import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { CategoriaProductos } from "src/entities"
import { Repository } from "typeorm"

import { StoreProductCategoryEntity } from "../../domain/entities"

@Injectable()
export class MySQLStoreProductCategoryService {
	constructor(
		@InjectRepository(CategoriaProductos)
		private readonly storeProductCategoryRepository: Repository<CategoriaProductos>
	) {}

	async getStoreProductCategories(id: number): Promise<StoreProductCategoryEntity[]> {
		const categories = await this.storeProductCategoryRepository.find({
			where: {
				tienda: id
			}
		})
		return categories.map((category) => this.toEntity(category))
	}

	toEntity(categoria: CategoriaProductos): StoreProductCategoryEntity {
		return new StoreProductCategoryEntity(categoria)
	}
}
