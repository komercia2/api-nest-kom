import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Geolocalizacion, Productos, Tiendas } from "src/entities"
import { Repository } from "typeorm"

@Injectable()
export class ChatbotsService {
	constructor(
		@InjectRepository(Tiendas) private readonly storeRepository: Repository<Tiendas>,
		@InjectRepository(Productos) private readonly productPrository: Repository<Productos>,
		@InjectRepository(Geolocalizacion)
		private readonly geolocalizacionRepository: Repository<Geolocalizacion>
	) {}

	async getProductInfo(productId: number) {
		const queryBuilder = this.productPrository
			.createQueryBuilder("productos")
			.where("productos.id = :productId", { productId })
			.andWhere("productos.activo = 1")
			.andWhere("productos.deletedAt IS NULL")
			.innerJoinAndSelect("productos.productosInfo", "productosInfo")
			.leftJoinAndSelect("productos.productosVariantes", "productosVariantes")
			.leftJoinAndSelect(
				"productosVariantes.productosVariantesCombinaciones",
				"productosVariantesCombinaciones"
			)
			.innerJoin("productos.tienda2", "tiendas")
			.innerJoin("tiendas.tiendasInfo", "tiendasInfo")
			.select([
				"tiendas.subdominio",
				"tiendasInfo.dominio",
				"productos.id",
				"productos.nombre",
				"productos.fotoCloudinary",
				"productos.precio",
				"productos.slug",
				"productosInfo.descripcionCorta",
				"productosInfo.inventario",
				"productosInfo.marca",
				"productosInfo.peso",
				"productosInfo.garantia",
				"productosVariantes.variantes",
				"productosVariantesCombinaciones.combinaciones"
			])

		const product = await queryBuilder.getOne()

		if (!product) return null

		let productUrl = ""

		if (product.tienda2?.subdominio && !product.tienda2?.tiendasInfo?.dominio) {
			productUrl = `https://${product.tienda2.subdominio}.komercia.store/productos/${product.slug}`
		} else if (product.tienda2?.tiendasInfo?.dominio) {
			productUrl = `${product.tienda2.tiendasInfo.dominio}/productos/${product.slug}`
		}

		return {
			id: product.id,
			url: productUrl,
			name: product.nombre,
			price: product.precio,
			image: product.fotoCloudinary,
			shortDescription: product.productosInfo.descripcionCorta,
			inventory: product.productosInfo.inventario,
			brand: product.productosInfo.marca,
			weight: product.productosInfo.peso,
			warranty: product.productosInfo.garantia,
			sku: product.slug,
			variantsType: product.productosVariantes
				.flatMap(({ variantes }) => JSON.parse(variantes || "[]"))
				.flat(1),
			combinations: product.productosVariantes
				.map(({ productosVariantesCombinaciones }) =>
					productosVariantesCombinaciones.map(({ combinaciones }) =>
						JSON.parse(combinaciones || "[]")
					)
				)
				.flat(2)
		}
	}

	async getGeolocations(storeId: number) {
		const queryBuilder = this.geolocalizacionRepository
			.createQueryBuilder("geolocalizacion")
			.where("geolocalizacion.tienda = :storeId", { storeId })
			.select([
				"geolocalizacion.id",
				"geolocalizacion.latitud",
				"geolocalizacion.longitud",
				"geolocalizacion.direccion",
				"geolocalizacion.horario"
			])

		const geolocations = await queryBuilder.getMany()

		return geolocations.map((geolocation) => ({
			id: geolocation.id,
			latitude: geolocation.latitud,
			longitude: geolocation.longitud,
			schedule: geolocation?.horario || null,
			address: geolocation.direccion
		}))
	}

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

		const [storeInfo, products, geolocations] = await Promise.all([
			queryBuilder.getOne(),
			this.getProducts(storeId),
			this.getGeolocations(storeId)
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
			products,
			geolocations: geolocations.map(({ schedule, address }) => ({ schedule, address }))
		}
	}
}
