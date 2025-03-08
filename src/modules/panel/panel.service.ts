import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Parser } from "json2csv"
import { Carritos, Clientes, DeliveryStatus, Productos, ProductosInfo } from "src/entities"
import { Like, Repository } from "typeorm"

import { prettifyShippingMethod } from "../orders/utils/prettifyShippingMethod"
import { GetProductsDtos } from "./dtos/get-productos.dtos"

@Injectable()
export class PanelService {
	constructor(
		@InjectRepository(Productos) private productosRepository: Repository<Productos>,
		@InjectRepository(ProductosInfo) private productosInfoRepository: Repository<ProductosInfo>,
		@InjectRepository(DeliveryStatus) private deliveryStatus: Repository<DeliveryStatus>,
		@InjectRepository(Carritos) private carritosRepository: Repository<Carritos>,
		@InjectRepository(Clientes) private clientesRepository: Repository<Clientes>
	) {}

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
			sale.telefono = sale.telefono ? sale.telefono : "N/A"
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
			client.telefono = client.telefono ? client.telefono : "N/A"
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
			.orderBy("productos.createdAt", "DESC")
			.skip((page - 1) * limit)
			.take(limit)

		if (name) query.where({ nombre: Like(`%${name}%`) })
		if (categoryID) query.andWhere("productos.categoriaProducto = :categoryID", { categoryID })
		if (freeShipping) query.andWhere("productos.envioGratis = :freeShipping", { freeShipping })
		if (withVariants) query.andWhere("productos.conVariante = :withVariants", { withVariants })
		if (favorite) query.andWhere("productos.favorito = :favorite", { favorite })

		const [products, total] = await query.getManyAndCount()

		return {
			data: products,
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
