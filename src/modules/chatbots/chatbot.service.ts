import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Productos, Tiendas } from "src/entities"
import { Repository } from "typeorm"

@Injectable()
export class ChatbotsService {
	constructor(
		@InjectRepository(Tiendas) private readonly storeRepository: Repository<Tiendas>,
		@InjectRepository(Productos) private readonly productPrository: Repository<Productos>
	) {}

	async getProducts(storeId: number) {
		const queryBuilder = this.productPrository
			.createQueryBuilder("productos")
			.where("productos.tienda = :storeId", { storeId })
			.andWhere("productos.activo = 1")
			.andWhere("productos.deletedAt IS NULL")
			.select(["productos.id", "productos.nombre", "productos.fotoCloudinary"])

		const products = await queryBuilder.getMany()

		return products.map((product) => ({
			id: product.id,
			name: product.nombre,
			image: product.fotoCloudinary
		}))
	}

	async getBasicInfo(storeId: number) {
		const queryBuilder = this.storeRepository
			.createQueryBuilder("store")
			.where("store.id = :storeId", { storeId })
			.leftJoin("store.categoriaProductos", "categoriaProductos")
			.leftJoin("store.tiendasInfo", "tiendasInfo")
			.leftJoin("store.tags", "tags")
			.select([
				"store.nombre",
				"tags.name",
				"categoriaProductos.nombreCategoriaProducto",
				"tiendasInfo.descripcion",
				"store.subdominio",
				"tiendasInfo.dominio"
			])

		const [storeInfo, products] = await Promise.all([
			queryBuilder.getOne(),
			this.getProducts(storeId)
		])

		if (!storeInfo) return null

		return {
			name: storeInfo.nombre,
			description: storeInfo.tiendasInfo.descripcion,
			domain: storeInfo.subdominio,
			subdomain: storeInfo.tiendasInfo.dominio,
			tags: storeInfo.tags.map((tag) => tag.name),
			categories: storeInfo.categoriaProductos.map(
				(categoria) => categoria.nombreCategoriaProducto
			),
			products
		}
	}
}
