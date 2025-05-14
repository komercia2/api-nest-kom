import { Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { paginateArray } from "@shared/infrastructure/utils"
import {
	Productos,
	ProductosInfo,
	ProductosVariantes,
	ProductosVariantesCombinaciones,
	VisitaProducto
} from "src/entities"
import { In, Repository } from "typeorm"

import { IProductFilterDTO } from "../../domain/repositories"
import { InfrastructureInjectionTokens } from "../infrastructure-injection-tokens"
import { productDefaultValues } from "../typings"
import { XlsxProductService } from "./xlsxl-product-service"

@Injectable()
export class MySQLProductService {
	private readonly delimiter = "-"

	constructor(
		@InjectRepository(Productos) private readonly productRepository: Repository<Productos>,
		@InjectRepository(ProductosInfo)
		private readonly productInfoRepository: Repository<ProductosInfo>,

		@InjectRepository(VisitaProducto)
		private readonly visitProductRepository: Repository<VisitaProducto>,

		@Inject(InfrastructureInjectionTokens.XlsxProductService)
		private readonly xlsxService: XlsxProductService
	) {}

	async getProductDescription(slug: string) {
		const { productId } = this.getSlug(slug)

		const product = await this.productInfoRepository.findOne({
			where: { id: productId },
			select: { descripcion: true }
		})

		return product?.descripcion || null
	}

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
			favorite,
			alphabetic,
			price
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
				"productos_info.descripcionCortaAuxiliar as descripcion_corta_auxiliar",
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
    END as tags`
			])
			.groupBy("productos.id")
			.addGroupBy("productos.nombre")
			.addGroupBy("productos.foto")
			.addGroupBy("productos.precio")
			.addGroupBy("productos.conVariante")
			.addGroupBy("productos.slug")
			.addGroupBy("productos.fotoCloudinary")
			.addGroupBy("productos.subcategoria")
			.addGroupBy("productos.favorito")
			.addGroupBy("productos.envioGratis")
			.addGroupBy("productos.orden")
			.addGroupBy("productos_info.sku")
			.addGroupBy("productos_info.marca")
			.addGroupBy("productos_info.descripcionCorta")
			.addGroupBy("productos_info.inventario")
			.addGroupBy("productos_info.tipoServicio")
			.addGroupBy("productos_info.promocionValor")
			.addGroupBy("productos_info.descripcionCortaAuxiliar")
			.addGroupBy("productos_info.tagPromocion")
			.addGroupBy("productos_info.dealerWhatsapp")
			.addGroupBy("categoria_producto.nombreCategoriaProducto")
			.addGroupBy("productos_variantes.id")
			.addGroupBy("productos_variantes.variantes")
			.addGroupBy("productos_variantes.idProducto2")
			.addGroupBy("tag_product.id")
			.addGroupBy("tag_product.tag_property_id")
			.addGroupBy("tag_product.productos_id")
			.addGroupBy("tag_product.created_at")
			.addGroupBy("tag_product.updated_at")
			.orderBy("productos.orden", "DESC")

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

		if (String(favorite) === "1") {
			queryBuilder.andWhere("productos.favorito = :favorite", { favorite })
		}

		if (alphabetic) {
			queryBuilder.orderBy("productos.nombre", alphabetic)
		}

		if (price) {
			queryBuilder.orderBy("productos.precio", price)
		}

		const count = await queryBuilder.getCount()

		const publicProductList = await queryBuilder.getRawMany()

		if (!publicProductList.length) {
			return { publicProductList: [], count, priceLimit: 0, priceMinimum: 0 }
		}

		const paginatedProducts = paginateArray(publicProductList, page, limit)

		const priceLimit = publicProductList.reduce((prev, curr) =>
			prev.precio > curr.precio ? prev : curr
		).precio

		const priceMinimum = publicProductList.reduce((prev, curr) => {
			if (prev.precio < curr.precio) {
				return prev
			}
			return curr
		}).precio

		return { publicProductList: paginatedProducts, count, priceLimit, priceMinimum }
	}


	async getProductBySlug(slug: string) {
		const { productId } = this.getSlug(slug)

		const product = await this.productRepository
			.createQueryBuilder("product")
			.where("product.id = :productId", { productId })
			.leftJoin("product.productosInfo", "info")
			.leftJoinAndSelect("product.categoriaProducto2", "categoria")
			.leftJoinAndSelect("product.productosFotos", "fotos")
			.leftJoinAndSelect("product.productosVariantes", "variantes")
			.leftJoinAndSelect("variantes.productosVariantesCombinaciones", "combinaciones")
			.leftJoinAndSelect("product.subcategoria2", "subcategoria_producto")
			.addSelect([
				"info.id",
				"info.marca",
				"info.sku",
				"info.peso",
				"info.inventario",
				"info.garantia",
				"info.video",
				"info.visitas",
				"info.positiva",
				"info.negativa",
				"info.proveedoresId",
				"info.codigoBarras",
				"info.codigoQr",
				"info.tipoServicio",
				"info.botonCompra",
				"info.botonWhatsapp",
				"info.botonPersonalizado",
				"info.textoBotonPersonalizado",
				"info.descripcionCortaAuxiliar",
				"info.urlBotonPersonalizado",
				"info.activarMensajes",
				"info.labelMensaje",
				"info.mensajeObligatorio",
				"info.mensaje",
				"info.iframe",
				"info.descripcionCorta",
				"info.promocionValor",
				"info.tagPromocion",
				"info.etiquetas",
				"info.bodega",
				"info.alto",
				"info.ancho",
				"info.largo",
				"info.dealerWhatsapp",
				"info.condicion"
			])
			.getOne()

		await this.increaseProductVisits(productId)

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

	async increaseProductVisits(productId: number) {
		await this.visitProductRepository.update(
			{ productoId: productId },
			{ numeroVisitas: () => "numeroVisitas + 1" }
		)
	}

	async createFromFile(storeId: number, file: Express.Multer.File) {
		const LOG_IDENTITY = "MySQLProductService:createFromFile"

		const queryRunner = this.productRepository.manager.connection.createQueryRunner()
		await queryRunner.connect()
		await queryRunner.startTransaction()

		try {
			const data = await this.xlsxService.createFromFile(file)

			const productosBatch: Productos[] = []
			const productosInfoBatch: ProductosInfo[] = []
			const productosVariantesBatch: ProductosVariantes[] = []
			const productosVariantesCombinacionesBatch: ProductosVariantesCombinaciones[] = []

			const { productDataDefault, productosInfoDefault } = productDefaultValues

			for (const importedProduct of data) {
				const productos = new Productos()
				productos.tienda = storeId
				productos.nombre = importedProduct.nombre
				productos.categoriaProducto = productDataDefault.categoriaProducto
				productos.subcategoria = productDataDefault.subcategoria
				productos.precio = importedProduct.precio_sin_variantes
				productos.foto = productDataDefault.foto
				productos.activo = productDataDefault.activo
				productos.disponibilidad = productDataDefault.disponibilidad
				productos.fotoCloudinary = productDataDefault.fotoCloudinary
				productos.idCloudinary = productDataDefault.idCloudinary
				productos.valorCompra = productDataDefault.valorCompra
				productos.conVariante = productDataDefault.conVariante
				productos.tag = productDataDefault.tag
				productos.favorito = productDataDefault.favorito
				productos.envioGratis = importedProduct.envio_gratis
				productos.orden = productDataDefault.orden
				productosBatch.push(productos)

				const productosVariantes = new ProductosVariantes()
				productosVariantes.idProducto2 = productos
				productosVariantes.variantes = productDataDefault.variantes
				productosVariantesBatch.push(productosVariantes)

				const productosVariantesCombinaciones = new ProductosVariantesCombinaciones()
				productosVariantesCombinaciones.idProductosVariantes2 = productosVariantes
				productosVariantesCombinaciones.combinaciones = productDataDefault.variantesCombinaciones
				productosVariantesCombinacionesBatch.push(productosVariantesCombinaciones)

				const productosInfo = new ProductosInfo()
				productosInfo.marca = importedProduct.marca
				productosInfo.sku = importedProduct.sku
				productosInfo.peso = importedProduct.peso
				productosInfo.descripcion = importedProduct.descripcion
				productosInfo.inventario = importedProduct.unidades
				productosInfo.garantia = importedProduct.garantia
				productosInfo.video = importedProduct.video_youtube
				productosInfo.visitas = productosInfoDefault.visitas
				productosInfo.positiva = productosInfoDefault.positiva
				productosInfo.negativa = productosInfoDefault.negativa
				productosInfo.proveedoresId = productosInfoDefault.proveedoresId
				productosInfo.codigoBarras = productosInfoDefault.codigoBarras
				productosInfo.codigoQr = productosInfoDefault.codigoQr
				productosInfo.productos = productos
				productosInfoBatch.push(productosInfo)
			}

			await queryRunner.manager.insert(Productos, productosBatch)

			const ids = productosBatch.map((producto) => producto.id)

			await queryRunner.manager
				.createQueryBuilder()
				.update(Productos)
				.set({ slug: () => `CONCAT(LOWER(REPLACE(nombre, ' ', '-')), '${this.delimiter}', id)` })
				.where("id IN (:...ids)", { ids })
				.execute()

			await queryRunner.manager.insert(ProductosInfo, productosInfoBatch)
			await queryRunner.manager.insert(ProductosVariantes, productosVariantesBatch)
			await queryRunner.manager.insert(
				ProductosVariantesCombinaciones,
				productosVariantesCombinacionesBatch
			)

			await queryRunner.commitTransaction()

			return true
		} catch (error) {
			await queryRunner.rollbackTransaction()
			console.log(`${LOG_IDENTITY}: Rollback transaction`)
			throw error
		} finally {
			console.log(`${LOG_IDENTITY}: Release connection`)
			await queryRunner.release()
		}
	}

	async getManyByIds(storeId: number, ids: number[]) {
		/**
 *  "id": 12755,
            "nombre": "Camisa Keep Calm",
            "precio": 0,
            "foto_cloudinary": "https://res.cloudinary.com/komercia-store/image/upload/v1576178760/582/products/jfadeoxhfdbyy1xeqaxt.png",
            "activo": 1,
            "foto": "",
            "con_variante": 1,
            "envio_gratis": 0,
            "orden": 0,
            "tag": null,
            "informacion_producto": [
                {
                    "id": 12755,
                    "garantia": null,
                    "inventario": 0,
                    "activar_mensajes": null,
                    "label_mensaje": null,
                    "mensaje_obligatorio": null,
                    "descripcion_corta": null,
                    "promocion_valor": null,
                    "tag_promocion": null,
                    "etiquetas": null,
                    "dealer_whatsapp": null,
                    "condicion": 1,
                    "proveedor": null
                }
            ],
            "variantes": [
                {
                    "id": 9906,
                    "variantes": "[{\"nombre\":\"Talla\",\"valores\":[{\"option\":\"S\",\"parent_index\":0},{\"option\":\"m\",\"parent_index\":0}],\"key\":\"variant1\",\"newVariant\":\"\"}]",
                    "id_producto": 12755,
                    "combinaciones": [
                        {
                            "id": 9905,
                            "combinaciones": "[{\"combinacion\":[\"S\"],\"estado\":true,\"precio\":55000,\"unidades\":9,\"sku\":\"sku 450\"},{\"combinacion\":[\"m\"],\"estado\":true,\"precio\":50000,\"unidades\":\"2\",\"sku\":\"\"}]",
                            "id_productos_variantes": 9906
                        }
                    ]
                }
            ]
        }
 */

		const products = await this.productRepository
			.createQueryBuilder("products")
			.select([
				"products.id",
				"products.nombre",
				"products.precio",
				"products.fotoCloudinary",
				"products.activo",
				"products.foto",
				"products.conVariante",
				"products.envioGratis",
				"products.orden",
				"products.tag",
				"info.id",
				"info.garantia",
				"info.inventario",
				"info.activarMensajes",
				"info.labelMensaje",
				"info.mensajeObligatorio",
				"info.descripcionCorta",
				"info.promocionValor",
				"info.tagPromocion",
				"info.etiquetas",
				"info.dealerWhatsapp",
				"info.condicion",
				"info.descripcionCortaAuxiliar",
				"proveedores",
				"variantes.id",
				"variantes.variantes",
				"variantes.idProducto2",
				"combinaciones.id",
				"combinaciones.combinaciones",
				"combinaciones.idProductosVariantes2"
			])
			.innerJoin("products.productosInfo", "info")
			.leftJoin("info.proveedores", "proveedores")
			.leftJoin("products.productosVariantes", "variantes")
			.leftJoin("variantes.productosVariantesCombinaciones", "combinaciones")
			.where("products.id IN (:...ids)", { ids })
			.andWhere("products.tienda = :storeId", { storeId })
			.orderBy("products.precio", "DESC")
			.orderBy("products.orden", "DESC")
			.orderBy("products.nombre", "ASC")
			.getMany()

		return products
	}

	private getSlug(slug: string) {
		const arraySlug = slug.split(this.delimiter)
		const length = arraySlug.length
		const productId = Number(arraySlug[length - 1])
		return { productId }
	}
}
