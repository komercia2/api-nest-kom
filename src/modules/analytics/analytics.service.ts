import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Carritos, Productos, StoreAnalytics } from "src/entities"
import { Repository } from "typeorm"

import { StoreAnalyticsEvent } from "../stores/domain/entities"
import { PaginationDto } from "../users/infrastructure/dtos/paginatation.dto"
import { FilterProductAnalyticsDto } from "./dto/filter-product-analytics.dto"

@Injectable()
export class AnalyticsService {
	constructor(
		@InjectRepository(StoreAnalytics)
		private storeAnalyticsRepository: Repository<StoreAnalytics>,
		@InjectRepository(Carritos) private carritosRepository: Repository<Carritos>,
		@InjectRepository(Productos) private productosRepository: Repository<Productos>
	) {}

	async getClientsTopTen(storeId: number) {
		const query = this.carritosRepository
			.createQueryBuilder("carts")
			.select("carts.usuario")
			.addSelect("COUNT(carts.usuario)", "count")
			.addSelect("usuario.nombre", "name")
			.addSelect("usuario.email", "email")
			.addSelect("ciudad.nombreCiu", "city")
			.innerJoin("carts.usuario2", "usuario")
			.innerJoin("usuario.ciudad2", "ciudad")
			.where("carts.tienda = :storeId", { storeId })
			.groupBy("carts.usuario")
			.orderBy("count", "DESC")
			.limit(10)

		return query.getRawMany()
	}

	async getProductsAnalytics(
		storeId: number,
		filters: FilterProductAnalyticsDto,
		paginationDto: PaginationDto
	) {
		const { limit, page } = paginationDto

		const query = this.productosRepository
			.createQueryBuilder("products")
			.select(["products.id", "products.nombre", "products.fotoCloudinary"])
			.innerJoinAndSelect("products.analytics", "analytics")
			.where("products.tienda = :storeId", { storeId })
			.andWhere("products.deletedAt IS NULL")
			.andWhere("products.activo = true")
			.skip((page - 1) * limit)
			.take(limit)

		if (filters?.name) query.andWhere("products.nombre LIKE :name", { name: `%${filters.name}%` })

		const [productsWithAnalytics, total] = await query.getManyAndCount()

		const adddToCartEvent = StoreAnalyticsEvent.ADDED_PRODUCT_TO_CART
		const viewedProductEvent = StoreAnalyticsEvent.VIEWED_PRODUCT
		const clickedPayCartEvent = StoreAnalyticsEvent.CLICKED_PAY_CART

		const productsWithAnalyticsCount = productsWithAnalytics.map((product) => {
			const productAnalytics = product?.analytics

			const addedToCart = productAnalytics.filter(({ event }) => event === adddToCartEvent)
			const viewedProduct = productAnalytics.filter(({ event }) => event === viewedProductEvent)
			const clickedPayCart = productAnalytics.filter(({ event }) => event === clickedPayCartEvent)

			return {
				...product,
				analytics: {
					addedToCart: addedToCart.length,
					viewedProduct: viewedProduct.length,
					clickedPayCart: clickedPayCart.length
				}
			}
		})

		return {
			data: productsWithAnalyticsCount,
			pagination: {
				total: Math.ceil(total / limit),
				page: +page,
				limit: +limit,
				hasPrev: page > 1,
				hasNext: page < Math.ceil(total / limit)
			}
		}
	}

	async getProductTopTen(storeId: number) {
		const query = this.storeAnalyticsRepository
			.createQueryBuilder("storeAnalytics")
			.select("storeAnalytics.productId")
			.addSelect("COUNT(storeAnalytics.productId)", "count")
			.addSelect("Productos.nombre", "name")
			.addSelect("Productos.fotoCloudinary", "image")
			.where("storeAnalytics.storeId = :storeId", { storeId })
			.andWhere("storeAnalytics.event = 'ADDED_PRODUCT_TO_CART'")
			.groupBy("storeAnalytics.productId")
			.orderBy("count", "DESC")
			.innerJoin("storeAnalytics.Productos", "Productos")
			.limit(10)

		return query.getRawMany()
	}

	async getCategoriesTopTen(storeId: number) {
		const query = this.storeAnalyticsRepository
			.createQueryBuilder("storeAnalytics")
			.select("storeAnalytics.categoriaProductos")
			.addSelect("COUNT(storeAnalytics.categoriaProductos)", "count")
			.addSelect("categoriaProductos.nombreCategoriaProducto", "name")
			.where("storeAnalytics.storeId = :storeId", { storeId })
			.groupBy("storeAnalytics.categoriaProductos")
			.orderBy("count", "DESC")
			.innerJoin("storeAnalytics.categoriaProductos", "categoriaProductos")
			.limit(10)

		return query.getRawMany()
	}
}
