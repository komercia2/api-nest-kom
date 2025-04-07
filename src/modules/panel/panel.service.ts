import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Parser } from "json2csv"
import { Logger } from "nestjs-pino"
import {
	Carritos,
	Clientes,
	DeliveryStatus,
	Geolocalizacion,
	Politicas,
	Productos,
	ProductosInfo,
	ProductosVariantesCombinaciones,
	Redes
} from "src/entities"
import { DataSource, Like, Repository } from "typeorm"

import { prettifyShippingMethod } from "../orders/utils/prettifyShippingMethod"
import { GetProductsDtos } from "./dtos/get-productos.dtos"
import { UpdateProductPricingDto } from "./dtos/update-product-pricing"
import { IGeolocation } from "./interfaces/zones"
import { mapGeolocation } from "./mappings/geolocation.mapper"
import { mapPolicy } from "./mappings/policie.mapper"

@Injectable()
export class PanelService {
	constructor(
		@InjectRepository(Productos) private productosRepository: Repository<Productos>,
		@InjectRepository(ProductosInfo) private productosInfoRepository: Repository<ProductosInfo>,
		@InjectRepository(DeliveryStatus) private deliveryStatus: Repository<DeliveryStatus>,
		@InjectRepository(Carritos) private carritosRepository: Repository<Carritos>,
		@InjectRepository(Clientes) private clientesRepository: Repository<Clientes>,
		@InjectRepository(Geolocalizacion) private geoLocationRepository: Repository<Geolocalizacion>,
		@InjectRepository(Politicas) private politicasRepository: Repository<Politicas>,
		@InjectRepository(Redes) private redesRepository: Repository<Redes>,
		@InjectRepository(ProductosVariantesCombinaciones)
		private combinacionesRepository: Repository<ProductosVariantesCombinaciones>,
		private readonly datasource: DataSource,
		private readonly logger: Logger
	) {}

	async editPaymentPolicies(storeID: number, pagos: string) {
		const policies = await this.politicasRepository.findOne({
			where: { idTienda: +storeID }
		})

		if (!policies) throw new NotFoundException("Policies not found")

		policies.pagos = pagos
		policies.updatedAt = new Date()

		await this.politicasRepository.save(policies)
	}

	async getPaymentPolcie(storeID: number) {
		return await this.politicasRepository.findOne({
			where: { idTienda: storeID },
			select: { pagos: true }
		})
	}

	async editNetworks(storeID: number, redesData: Partial<Redes>) {
		const redes = await this.redesRepository.findOne({
			where: { id: storeID }
		})

		if (!redes) throw new NotFoundException("Networks not found")

		redes.facebook = redesData?.facebook ?? redes.facebook
		redes.instagram = redesData?.instagram ?? redes.instagram
		redes.twitter = redesData?.twitter ?? redes.twitter
		redes.youtube = redesData?.youtube ?? redes.youtube
		redes.whatsapp = redesData?.whatsapp ?? redes.whatsapp
		redes.tiktok = redesData?.tiktok ?? redes.tiktok

		await this.redesRepository.save(redes)
	}

	async getNetworks(storeID: number) {
		const networks = await this.redesRepository.findOne({
			where: { id: storeID }
		})

		if (!networks) throw new NotFoundException("Networks not found")

		return networks
	}

	async editPolicies(storeID: number, policiesData: Partial<Politicas>) {
		const policies = await this.politicasRepository.findOne({
			where: { idTienda: storeID }
		})
		if (!policies) throw new NotFoundException("Policies not found")
		policies.envios = policiesData?.envios ?? policies.envios
		policies.pagos = policiesData?.pagos ?? policies.pagos
		policies.datos = policiesData?.datos ?? policies.datos
		policies.garantia = policiesData?.garantia ?? policies.garantia
		policies.devolucion = policiesData?.devolucion ?? policies.devolucion
		policies.cambio = policiesData?.cambio ?? policies.cambio
		policies.updatedAt = new Date()

		await this.politicasRepository.save(policies)
	}

	async getPolicies(storeID: number) {
		const policie = await this.politicasRepository.findOne({
			where: { idTienda: storeID }
		})

		if (!policie) throw new NotFoundException("Policies not found")

		return mapPolicy(policie)
	}

	async deleteGeolocation(storeID: number, geolocationID: number) {
		const geolocation = await this.geoLocationRepository.findOne({
			where: { id: geolocationID, tienda: +storeID }
		})
		if (!geolocation) throw new NotFoundException("Geolocation not found")
		await this.geoLocationRepository.delete({ id: geolocationID, tienda: +storeID })
	}

	async createGeolocation(storeID: number, geolocationData: IGeolocation) {
		const geolocation = this.geoLocationRepository.create({
			nombreSede: geolocationData.nombre_sede,
			direccion: geolocationData.direccion,
			latitud: geolocationData.latitud,
			longitud: geolocationData.longitud,
			ciudad: geolocationData.ciudad,
			horario: geolocationData.horario,
			fotoTienda: geolocationData.foto_tienda,
			telefono: geolocationData.telefono,
			createdAt: new Date(),
			tienda: storeID
		})
		await this.geoLocationRepository.save(geolocation)
	}

	async editGeolocation(
		storeID: number,
		geolocationID: number,
		geolocationData: Partial<IGeolocation>
	) {
		const geolocation = await this.geoLocationRepository.findOne({
			where: { id: geolocationID, tienda: +storeID }
		})

		if (!geolocation) throw new NotFoundException("Geolocation not found")

		geolocation.nombreSede = geolocationData?.nombre_sede ?? geolocation.nombreSede
		geolocation.direccion = geolocationData?.direccion ?? geolocation.direccion
		geolocation.latitud = geolocationData?.latitud ?? geolocation.latitud
		geolocation.longitud = geolocationData?.longitud ?? geolocation.longitud
		geolocation.ciudad = geolocationData?.ciudad ?? geolocation.ciudad
		geolocation.horario = geolocationData?.horario ?? geolocation.horario
		geolocation.fotoTienda = geolocationData?.foto_tienda ?? geolocation.fotoTienda
		geolocation.telefono = geolocationData?.telefono ?? geolocation.telefono
		geolocation.updatedAt = new Date()

		await this.geoLocationRepository.save(geolocation)
	}

	async getGeolocations(storeID: number) {
		const sites = await this.geoLocationRepository.find({
			where: { tienda: storeID },
			order: { createdAt: "DESC" }
		})

		return sites.map((site) => mapGeolocation(site))
	}

	async updateProductPricing(dto: UpdateProductPricingDto) {
		const { id, unidades, precio, combinaciones, storeID } = dto

		if (precio < 0) throw new BadRequestException("Price cannot be negative")
		if (unidades < 0) throw new BadRequestException("Units cannot be negative")

		const product = await this.productosRepository.findOne({
			where: { id, tienda: storeID },
			relations: [
				"productosInfo",
				"productosVariantes",
				"productosVariantes.productosVariantesCombinaciones"
			]
		})

		if (!product) throw new NotFoundException("Product not found")

		product.precio = precio
		product.productosInfo.inventario = unidades

		const queryRunner = this.datasource.createQueryRunner()

		this.logger.log("QueryRunner created")

		await queryRunner.connect()

		this.logger.log("QueryRunner connected")

		await queryRunner.startTransaction()

		this.logger.log("Transaction started")

		try {
			await Promise.all([
				this.productosInfoRepository.save(product.productosInfo),
				this.productosRepository.save(product)
			])

			if (combinaciones && combinaciones.length > 0) {
				await Promise.all(
					combinaciones.map(async (combination) => {
						const { id: combinationID, combinaciones: combinationValue } = combination

						const combinationEntity = await this.combinacionesRepository.findOne({
							where: { id: combinationID }
						})

						if (!combinationEntity) throw new NotFoundException("Combination not found")

						combinationEntity.combinaciones = combinationValue

						await this.combinacionesRepository.save(combinationEntity)
					})
				)
			}

			await queryRunner.commitTransaction()

			this.logger.log("Product pricing updated successfully", "updateProductPricing")
		} catch (error) {
			await queryRunner.rollbackTransaction()

			this.logger.error("Error updating product pricing", error, "updateProductPricing")

			throw new InternalServerErrorException("Error updating product pricing")
		}
	}

	async exportSales(storeID: number, cartIDs?: Array<string>) {
		const query = this.carritosRepository
			.createQueryBuilder("carritos")
			.innerJoin("carritos.usuario2", "users")
			.innerJoin("users.ciudad2", "ciudades")
			.innerJoin("users.usersInfo", "usersInfo")
			.innerJoin("users.ciudad2", "ciudad2")
			.innerJoin("ciudad2.departamento", "departamentos")
			.innerJoin("departamentos.paises", "paises")
			.where("carritos.tienda = :storeID", { storeID })
			.select([
				"carritos.id as id",
				"users.nombre as nombre",
				"users.tipoIdentificacion as tipo_identificacion",
				"users.identificacion as identificacion",
				"users.email as email",
				"ciudades.nombreCiu as ciudad",
				"usersInfo.telefono as telefono",
				"carritos.total as total",
				"carritos.createdAt as fecha_compra",
				"carritos.metodoPago as metodo_pago",
				"carritos.cupon as cupon",
				"carritos.estado as estado",
				"paises.codigo as codigo_pais",
				"carritos.estadoEntrega as estado_entrega"
			])
			.orderBy("carritos.createdAt", "DESC")

		// Filtrar por IDs si existen
		if (cartIDs && cartIDs?.length > 0) {
			const parsedCartIDs = cartIDs.map((id) => parseInt(id))
			query.andWhere("carritos.id IN (:...cartIDs)", { cartIDs: parsedCartIDs })
		}

		const sales = await query.getRawMany()

		// Parseo de fechas y formato de moneda
		const parsedSales = sales.map((sale) => {
			sale.fecha_compra = new Date(sale.fecha_compra).toISOString().split("T")[0]
			sale.telefono = sale.telefono ? this.removeCountryCode(sale.telefono) : "N/A"
			sale.total = new Intl.NumberFormat("es-ES", {
				style: "currency",
				currency: this.mapCountrieCurrency(sale.codigo_pais)
			}).format(sale.total)
			sale.metodo_pago = prettifyShippingMethod(sale.metodo_pago)
			sale.estado = this.mapCartState(sale.estado)
			sale.cupon =
				sale.cupon === "null" ||
				sale.cupon === "" ||
				sale.cupon === "undefined" ||
				sale.cupon === null ||
				sale.cupon === undefined
					? "N/A"
					: sale.cupon
			sale.estado_entrega = this.mapDeliveryStatus(sale.estado_entrega)
			return sale
		})

		const fields = [
			"nombre",
			"tipo_identificacion",
			"identificacion",
			"email",
			"ciudad",
			"telefono",
			"total",
			"fecha_compra",
			"metodo_pago",
			"cupon",
			"estado",
			"estado_entrega"
		]

		const csv = new Parser({ fields }).parse(parsedSales)

		return {
			data: csv,
			filename: `ventas-${new Date().toISOString().split("T")[0]}.csv`
		}
	}

	async exportClients(storeID: number, clientIDs?: Array<string>) {
		const query = this.clientesRepository
			.createQueryBuilder("clientes")
			.innerJoin("clientes.user", "users")
			.innerJoin("users.ciudad2", "ciudades")
			.innerJoin("users.usersInfo", "usersInfo")
			.leftJoin("users.carritos2", "carritos", "carritos.estado = 1")
			.innerJoin("users.ciudad2", "ciudad2")
			.innerJoin("ciudad2.departamento", "departamentos")
			.innerJoin("departamentos.paises", "paises")
			.where("clientes.tienda = :storeID", { storeID })
			.select([
				"users.id as id",
				"users.nombre as nombre",
				"users.tipoIdentificacion as tipo_identificacion",
				"users.identificacion as identificacion",
				"users.email as email",
				"ciudades.nombreCiu as ciudad",
				"usersInfo.telefono as telefono",
				"CAST(COUNT(carritos.id) as UNSIGNED) as cantidad_compras",
				"SUM(carritos.total) as compras_completadas",
				"MAX(carritos.createdAt) as ultima_compra",
				"COUNT(carritos.cupon) > 0 as usuario_uso_cupon",
				"MAX(carritos.metodoPago) as metodo_pago_preferido",
				"paises.codigo as codigo_pais"
			])
			.groupBy(
				"users.id, users.nombre, users.tipoIdentificacion, users.identificacion, users.email, ciudades.nombreCiu, usersInfo.telefono"
			)

		// Filtrar por IDs si existen
		if (clientIDs && clientIDs?.length > 0) {
			const parsedClientIDs = clientIDs.map((id) => parseInt(id))
			query.andWhere("users.id IN (:...clientIDs)", { clientIDs: parsedClientIDs })
		}

		const clients = await query.getRawMany()

		// Parseo de fechas y formato de moneda
		const parsedClients = clients.map((client) => {
			client.ultima_compra = new Date(client.ultima_compra).toISOString().split("T")[0]
			client.usuario_uso_cupon = client.usuario_uso_cupon === "1" ? "SI" : "NO"
			client.telefono = client.telefono ? this.removeCountryCode(client.telefono) : "N/A"
			client.identificacion = ` ${client.identificacion}`
			client.compras_completadas = new Intl.NumberFormat("es-ES", {
				style: "currency",
				currency: this.mapCountrieCurrency(client.codigo_pais)
			}).format(client.compras_completadas)
			client.metodo_pago_preferido = prettifyShippingMethod(client.metodo_pago_preferido)
			return client
		})

		const fields = [
			"nombre",
			"tipo_identificacion",
			"identificacion",
			"email",
			"ciudad",
			"telefono",
			"cantidad_compras",
			"compras_completadas",
			"ultima_compra",
			"usuario_uso_cupon",
			"metodo_pago_preferido"
		]

		// Generar CSV
		const csv = new Parser({ fields }).parse(parsedClients)

		return {
			data: csv,
			filename: `clientes-${new Date().toISOString().split("T")[0]}.csv`
		}
	}

	mapDeliveryStatus(state: string) {
		if (state === "1") return "Pendiente"
		if (state === "2") return "En Empaque"
		if (state === "3") return "En Tránsito"
		if (state === "4") return "Devuelto"
		if (state === "5") return "Entregado"
		if (state === "6") return "Cancelado"
		return "Pendiente"
	}

	mapCartState(state: string) {
		if (state === "0") return "Sin Pagar"
		if (state === "1") return "Pagado"
		if (state === "3") return "Cancelada"
		if (state === "4") return "Despachada"
		if (state === "6") return "Entregada"
		return "Rechazada"
	}

	mapCountrieCurrency(countrieCode: string) {
		if (countrieCode.toLowerCase() === "co") return "COP"
		if (countrieCode.toLowerCase() === "internacional") return "USD"
		if (countrieCode.toLowerCase() === "mx") return "MXN"
		if (countrieCode.toLowerCase() === "ar") return "ARS"
		if (countrieCode.toLowerCase() === "cl") return "CLP"
		if (countrieCode.toLowerCase() === "pr") return "USD"
		if (countrieCode.toLowerCase() === "pe") return "PEN"
		if (countrieCode.toLowerCase() === "pan") return "USD"
		return "COP"
	}

	removeCountryCode(phone: string) {
		if (phone.startsWith("+57")) return phone.substring(3)
		if (phone.startsWith("+52")) return phone.substring(3)
		if (phone.startsWith("+54")) return phone.substring(3)
		if (phone.startsWith("+56")) return phone.substring(3)
		if (phone.startsWith("+1")) return phone.substring(2)
		if (phone.startsWith("+51")) return phone.substring(3)
		if (phone.startsWith("+507")) return phone.substring(4)
		return phone
	}

	async deleteProductDeliveryStatus(cartID: number) {
		const cart = await this.carritosRepository.findOne({ where: { id: cartID } })

		if (!cart) throw new NotFoundException("Carrito no encontrado")

		cart.deliveryStatusId = null

		await this.carritosRepository.save(cart)
	}

	async updateDeliveryStatus(deliveryStatusID: number, cartID: number) {
		const cart = await this.carritosRepository.findOne({ where: { id: cartID } })

		if (!cart) throw new NotFoundException("Carrito no encontrado")

		const deliveryStatus = await this.deliveryStatus.findOne({
			where: { id: deliveryStatusID.toString() }
		})

		if (!deliveryStatus) throw new NotFoundException("Estado de entrega no encontrado")

		cart.deliveryStatus = deliveryStatus
		cart.deliveryStatusId = deliveryStatusID.toString()

		await this.carritosRepository.save(cart)
	}

	async getDeliveryStatus() {
		return this.deliveryStatus.find()
	}

	async getShortAuxDescription(productID: number) {
		const product = await this.productosInfoRepository.findOne({ where: { id: productID } })

		if (!product) throw new NotFoundException("Producto no encontrado")

		return { shortAuxDescription: product.descripcionCortaAuxiliar }
	}

	async updateShortAuxDescription(productID: number, shortAuxDescription: string) {
		const product = await this.productosInfoRepository.findOne({ where: { id: productID } })

		if (!product) throw new NotFoundException("Producto no encontrado")
		if (shortAuxDescription.length > 150) {
			throw new BadRequestException(
				"La descripción auxiliar corta no puede tener más de 150 caracteres"
			)
		}

		product.descripcionCortaAuxiliar = shortAuxDescription

		await this.productosInfoRepository.save(product)
	}

	async getProductos(storeID: number, getProductsDtos: GetProductsDtos) {
		const { name, page, limit, categoryID, freeShipping, withVariants, favorite } = getProductsDtos

		const query = this.productosRepository
			.createQueryBuilder("productos")
			.where("productos.tienda = :storeID", { storeID })
			.andWhere("productos.activo = 1")
			.andWhere("productos.deletedAt IS NULL")
			.leftJoinAndSelect("productos.categoriaProducto2", "categoria")
			.leftJoinAndSelect("productos.subcategoria2", "subcategoria")
			.leftJoinAndSelect("productos.productosDropshippings", "dropshipping")
			.leftJoin("productos.productosInfo", "productosInfo")
			.addSelect("productosInfo.tipoServicio")
			.orderBy("productos.createdAt", "DESC")
			.skip((page - 1) * limit)
			.take(limit)

		if (name) query.where({ nombre: Like(`%${name}%`) })
		if (categoryID) query.andWhere("productos.categoriaProducto = :categoryID", { categoryID })
		if (freeShipping) query.andWhere("productos.envioGratis = :freeShipping", { freeShipping })
		if (withVariants) query.andWhere("productos.conVariante = :withVariants", { withVariants })
		if (favorite) query.andWhere("productos.favorito = :favorite", { favorite })

		const [products, total] = await query.getManyAndCount()

		const mappedProducts = products.map((product) => {
			return {
				id: product.id,
				tienda: product.tienda,
				nombre: product.nombre,
				categoria_producto: {
					id: product.categoriaProducto,
					nombre_categoria_producto: product.categoriaProducto2.nombreCategoriaProducto,
					tienda: product.categoriaProducto2.tienda,
					descripcion: product.categoriaProducto2.descripcion,
					foto_banner: product.categoriaProducto2.fotoBanner,
					orden: product.categoriaProducto2.orden,
					foto_icono: product.categoriaProducto2.fotoIcono,
					id_cloudinary: product.categoriaProducto2.idCloudinary,
					imagen_cloudinary: product.categoriaProducto2.imagenCloudinary
				},
				subcategoria: product.subcategoria,
				precio: product.precio,
				foto: product.foto,
				activo: product.activo,
				disponibilidad: product.disponibilidad,
				foto_cloudinary: product.fotoCloudinary,
				slug: product.slug,
				deleted_at: product.deletedAt,
				id_cloudinary: product.idCloudinary,
				envio_gratis: product.envioGratis,
				con_variante: product.conVariante,
				valor_compra: product.valorCompra,
				created_at: product.createdAt,
				updated_at: product.updatedAt,
				tag: product.tag,
				favorito: product.favorito,
				orden: product.orden,
				ml_published: product.mlPublished,
				id_siigo: product.idSiigo,
				marca: product.productosInfo.marca,
				promocion_valor: product.productosInfo.promocionValor,
				tag_promocion: product.productosInfo.tagPromocion,
				etiquetas: product.productosInfo.etiquetas,
				bodega: product.productosInfo.bodega,
				alto: product.productosInfo.alto,
				ancho: product.productosInfo.ancho,
				largo: product.productosInfo.largo,
				dealer_whatsapp: product.productosInfo.dealerWhatsapp,
				condicion: product.productosInfo.condicion,
				dropshipping: product.productosDropshippings.map((dropshipping) => {
					return {
						id: dropshipping.id,
						comision: dropshipping.comision,
						productos_id: dropshipping.productosId,
						created_at: dropshipping.createdAt,
						updated_at: dropshipping.updatedAt,
						estado: dropshipping.estado
					}
				})
			}
		})

		return {
			data: mappedProducts,
			pagination: {
				total: Math.ceil(total / limit),
				page: +page,
				limit: +limit,
				hasPrev: page > 1,
				hasNext: page < Math.ceil(total / limit)
			}
		}
	}
}
