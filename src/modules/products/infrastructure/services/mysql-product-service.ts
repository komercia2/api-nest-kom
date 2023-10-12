import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Productos } from "src/entities"
import { Repository } from "typeorm"

import { IProductFilterDTO } from "../../domain/repositories"

@Injectable()
export class MySQLProductService {
	private readonly delimiter = "-"

	constructor(
		@InjectRepository(Productos) private readonly productRepository: Repository<Productos>
	) {}
	async getPagedProducts(data: IProductFilterDTO) {
		const {
			storeId,
			name,
			page,
			limit,
			active,
			category,
			freeShipping,
			maxPrice,
			minPrice,
			promotion,
			subcategory,
			tagPropertyId,
			withVariants,
			topSales,
			alphabetic
		} = data
		const queryBuilder = this.productRepository
			.createQueryBuilder("productos")
			.innerJoin("productos.productosInfo", "productos_info")
			.leftJoinAndSelect("productos.categoriaProducto2", "categoria_producto")
			.leftJoinAndSelect("productos.productosVariantes", "productos_variantes")
			.leftJoinAndSelect(
				"productos_variantes.productosVariantesCombinaciones",
				"productos_variantes_combinaciones"
			)
			.leftJoinAndSelect("productos.tagProducts", "tag_product")
			.where("productos.tienda = :id", { id: storeId })
			.andWhere("productos.activo = :activo", { activo: active })
			.andWhere("productos.deletedAt IS NULL")
			.select([
				"productos.id as id",
				"productos.nombre as nombre",
				"productos.foto as foto",
				"productos.precio as precio",
				"productos.conVariante as con_variante",
				"productos.slug as slug",
				"productos_info.sku as sku",
				"productos_info.marca as marca",
				"productos_info.descripcionCorta as descripcion",
				"productos_info.inventario as stock",
				"productos_info.tipoServicio as tipo_servicio",
				"productos_info.promocionValor as promocion_valor",
				"productos_info.tagPromocion as tag_promocion",
				"productos_info.dealerWhatsapp as dealer_whatsapp",
				"productos.fotoCloudinary as foto_cloudinary",
				"categoria_producto.nombreCategoriaProducto as categoria",
				"productos.subcategoria as subcategoria",
				"productos.favorito as favorito",
				"productos.envioGratis as envio_gratis",
				"productos.orden as orden",
				`
				JSON_OBJECT(
					'id', productos_variantes.id,
					'variantes', productos_variantes.variantes,
					'id_producto', productos_variantes.idProducto2,
					'combinaciones', JSON_ARRAYAGG(
						JSON_OBJECT(
							'id', productos_variantes_combinaciones.id,
							'combinaciones', productos_variantes_combinaciones.combinaciones,
							'id_productos_variantes', productos_variantes_combinaciones.id_productos_variantes
						)
					)
				) as variantes`,
				`
				CASE
					WHEN tag_product.id IS NULL THEN JSON_ARRAY()
				ELSE
					JSON_ARRAYAGG(
						JSON_OBJECT(
							'id', tag_product.id,
							'tag_property_id', tag_product.tag_property_id,
							'productos_id', tag_product.productos_id,
							'created_at', tag_product.created_at,
							'updated_at', tag_product.updated_at
						)
					) 
				END
				as tags
				`
			])
			.groupBy("productos.id")
			.orderBy("productos.orden", "DESC")
			.limit(limit)
			.offset((page - 1) * limit)

		if (name) {
			const cleanName = name.toLowerCase().trim()
			queryBuilder.andWhere("LOWER(productos.nombre) LIKE :name", { name: `%${cleanName}%` })
		}

		if (category) {
			queryBuilder.andWhere("categoria_producto.nombreCategoriaProducto = :category", { category })
		}

		if (subcategory) {
			queryBuilder.andWhere("productos.subcategoria = :subcategory", { subcategory })
		}

		if (freeShipping) {
			queryBuilder.andWhere("productos.envioGratis = :freeShipping", { freeShipping })
		}

		if (String(promotion) === "1") {
			queryBuilder.andWhere(
				"productos_info.promocionValor > 0 AND productos_info.promocionValor IS NOT NULL"
			)
		}

		if (maxPrice && minPrice) {
			queryBuilder.andWhere("productos.precio BETWEEN :minPrice AND :maxPrice", {
				minPrice,
				maxPrice
			})
		}

		if (tagPropertyId) {
			queryBuilder.andWhere("tag_product.tag_property_id = :tagPropertyId", { tagPropertyId })
		}

		if (withVariants) {
			queryBuilder.andWhere("productos.conVariante = :withVariants", { withVariants })
		}

		if (String(topSales) === "1") {
			queryBuilder
				.leftJoin("productos.productosCarritos", "productos_carritos")
				.groupBy("productos.id")
				.orderBy("COUNT(productos_carritos.producto)", "DESC")
		}

		if (alphabetic) {
			queryBuilder.orderBy("productos.nombre", alphabetic)
		}
		const count = await queryBuilder.getCount()

		const publicProductList = await queryBuilder.getRawMany()

		const priceLimit = publicProductList.reduce((prev, curr) =>
			prev.precio > curr.precio ? prev : curr
		).precio

		const priceMinimum = publicProductList.reduce((prev, curr) => {
			if (prev.precio < curr.precio) {
				return prev
			}
			return curr
		}).precio

		return { publicProductList, count, priceLimit, priceMinimum }
	}

	async getProductBySlug(slug: string) {
		const { productId } = this.getSlug(slug)

		const product = await this.productRepository
			.createQueryBuilder("product")
			.where("product.id = :productId", { productId })
			.leftJoinAndSelect("product.productosInfo", "info")
			.leftJoinAndSelect("product.categoriaProducto2", "categoria")
			.leftJoinAndSelect("product.productosFotos", "fotos")
			.leftJoinAndSelect("product.productosVariantes", "variantes")
			.leftJoinAndSelect("variantes.productosVariantesCombinaciones", "combinaciones")
			.leftJoinAndSelect("product.subcategoria2", "subcategoria_producto")
			.getOne()

		if (product && product.productosVariantes.length > 0) {
			const { productosVariantes, ...rest } = product
			const combinaciones = productosVariantes.map(
				(variante) => variante.productosVariantesCombinaciones
			)

			return { ...rest, combinaciones, productosVariantes }
		}

		if (product) {
			const { productosVariantes: _, ...rest } = product
			return { ...rest, combinaciones: [], productosVariantes: [] }
		}

		return product
	}

	private getSlug(slug: string) {
		const arraySlug = slug.split(this.delimiter)
		const length = arraySlug.length
		const productId = Number(arraySlug[length - 1])
		return { productId }
	}
}
