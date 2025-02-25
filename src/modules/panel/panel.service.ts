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

	async exportClients(storeID: number) {
		const clients = await this.clientesRepository
			.createQueryBuilder("clientes")
			.where("clientes.tienda = :storeID", { storeID })
			.innerJoin("clientes.user", "users")
			.innerJoin("users.ciudad2", "ciudades")
			.innerJoin("users.usersInfo", "usersInfo")
			.leftJoin("users.carritos2", "carritos")
			.orderBy("clientes.createdAt", "DESC")
			.groupBy("clientes.id")
			.select([
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
				"MAX(carritos.metodoPago) as metodo_pago_preferido"
			])
			.where("carritos.estado = 1")
			.getRawMany()

		// Parse dates
		const parsedClients = clients.map((client) => {
			client.ultima_compra = new Date(client.ultima_compra).toISOString().split("T")[0]
			client.usuario_uso_cupon = client.usuario_uso_cupon === "1" ? "SI" : "NO"
			client.telefono = client.telefono ? `'${client.telefono}` : ""
			client.compras_completadas = new Intl.NumberFormat("en-US", {
				style: "decimal",
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
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

		// Generate CSV
		const csv = new Parser({ fields }).parse(parsedClients)

		return {
			data: csv,
			filename: `clientes-${new Date().toISOString().split("T")[0]}.csv`
		}
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
