import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Subcategorias } from "src/entities"
import { Repository } from "typeorm"

import { StoreProductSubcategoryEntity } from "../../domain/entities"

@Injectable()
export class MysqlStoreProductSubcategoryService {
	constructor(
		@InjectRepository(Subcategorias)
		private readonly storeProductSubcategoryRepository: Repository<Subcategorias>
	) {}

	async getStoreProductSubcategories(storeId: number) {
		const subcategories = await this.storeProductSubcategoryRepository
			.createQueryBuilder("subcategorias")
			.where("subcategorias.tienda = :storeId", { storeId })
			.select([
				"subcategorias.id",
				"subcategorias.nombreSubcategoria",
				"subcategorias.categoria",
				"subcategorias.imagenCloudinary"
			])
			.getMany()
		return subcategories.map(this.toEntity)
	}

	toEntity = (subcategory: Subcategorias): StoreProductSubcategoryEntity => ({
		...subcategory
	})
}
