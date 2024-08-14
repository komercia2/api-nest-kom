import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Productos, Tiendas } from "src/entities"
import { Repository } from "typeorm"

import { GetProductsDto } from "./dto/get-products.dto"

@Injectable()
export class ChatbotsService {
	constructor(
		@InjectRepository(Tiendas) private readonly storeRepository: Repository<Tiendas>,
		@InjectRepository(Productos) private readonly productRepository: Repository<Productos>
	) {}

	async getProducts(storeID: number, getProductDto: GetProductsDto) {
		const { name } = getProductDto

		const query = this.productRepository
			.createQueryBuilder("productos")
			.select([
				"productos.id",
				"productos.nombre",
				"productos.precio",
				"productos.activo",
				"productos.envioGratis",
				"productos.categoriaProducto2"
			])
			.where("productos.deletedAt IS NULL")
			.where("productos.activo = 1")
			.andWhere("productos.tienda = :storeID", { storeID })
			.leftJoin("productos.categoriaProducto2", "categoriaProducto2")

		if (name) query.andWhere("productos.nombre LIKE :name", { name: `%${name}%` })

		return await query.getMany()
	}

	async getStoreBasicInfo(storeID: number) {
		const query = this.storeRepository
			.createQueryBuilder("tiendas")
			.select([
				"tiendas.id",
				"tiendas.nombre",
				"tags.name",
				"categoria2.nombreCategoria",
				"tiendasInfo.descripcion"
			])
			.andWhere("tiendas.activo = 1")
			.where("tiendas.id = :storeID", { storeID })
			.leftJoin("tiendas.tags", "tags")
			.leftJoin("tiendas.categoria2", "categoria2")
			.leftJoin("tiendas.tiendasInfo", "tiendasInfo")

		return await query.getOne()
	}
}
