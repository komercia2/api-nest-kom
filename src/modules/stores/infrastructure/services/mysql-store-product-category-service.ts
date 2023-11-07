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
		const categories = await this.storeProductCategoryRepository
			.createQueryBuilder("categoria_productos")
			.where("categoria_productos.tienda = :id", { id })
			.select([
				"categoria_productos.id",
				"categoria_productos.nombreCategoriaProducto",
				"categoria_productos.orden",
				"categoria_productos.imagenCloudinary"
			])
			.getMany()
		return categories.map((categoria) => this.toEntity(categoria))
	}

	toEntity(categoria: CategoriaProductos): StoreProductCategoryEntity {
		return new StoreProductCategoryEntity(categoria)
	}
}
