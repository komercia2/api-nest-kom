import {
	BadRequestException,
	ConflictException,
	Injectable,
	InternalServerErrorException
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Logger } from "nestjs-pino"
import {
	Carritos,
	Clientes,
	MensajeOrden,
	Productos,
	ProductosCarritos,
	ProductosInfo,
	ProductosVariantes,
	ProductosVariantesCombinaciones,
	Users
} from "src/entities"
import { DataSource, QueryRunner, Repository } from "typeorm"

import { CreateOrderDto, Producto } from "./dtos/create-order-dto"

type Combination = {
	combinacion: string
	estado: boolean
	precio: number
	unidades: number
	sku: string
}

enum CLIENT_ASSIGNATION_METHOD {
	ORDER = "order",
	CREATE = "create"
}

@Injectable()
export class OrdersService {
	constructor(
		@InjectRepository(Carritos) private readonly carritosRepository: Repository<Carritos>,

		@InjectRepository(Productos) private readonly productosRepository: Repository<Productos>,

		@InjectRepository(ProductosVariantes)
		private readonly productosVariantesRepository: Repository<ProductosVariantes>,

		@InjectRepository(ProductosVariantesCombinaciones)
		private readonly productosVariantesCombinacionesRepository: Repository<ProductosVariantesCombinaciones>,

		@InjectRepository(ProductosInfo)
		private readonly productosInfoRepository: Repository<ProductosInfo>,

		@InjectRepository(MensajeOrden)
		private readonly mensajeOrdenRepository: Repository<MensajeOrden>,

		@InjectRepository(Users) private readonly usersRepository: Repository<Users>,

		@InjectRepository(Clientes) private readonly clientesRepository: Repository<Clientes>,

		private readonly datasource: DataSource,

		private readonly logger: Logger
	) {}

	async createOrder(createOrderDto: CreateOrderDto) {
		const queryRunner = this.datasource.createQueryRunner()

		this.logger.log("QueryRunner created")

		await queryRunner.connect()

		this.logger.log("QueryRunner connected")

		await queryRunner.startTransaction()

		this.logger.log("Transaction started")

		const { productos, tienda, usuario, comentario } = createOrderDto

		try {
			const cart = await this.createCart(createOrderDto)
			await queryRunner.manager.save(cart)

			this.logger.log(`Cart ${cart.id} created`)

			if (productos.length === 0) {
				throw new BadRequestException("Products not found")
			}

			await Promise.all(
				productos.map(async (producto) => {
					const { id, nombre, activo, con_variante } = producto

					const product = await this.productosRepository.findOne({ where: { id, tienda } })

					if (!product) throw new BadRequestException("Product not found")
					if (!activo) throw new BadRequestException(`Product ${nombre} is not active`)

					if (con_variante) {
						const variant = await this.productosVariantesRepository.findOne({
							where: { idProducto: id }
						})

						if (!variant) throw new BadRequestException("Product variants not found")

						const combinations = await this.productosVariantesCombinacionesRepository.findOne({
							where: { idProductosVariantes: variant.id }
						})

						if (!combinations) throw new BadRequestException("Product combinations not found")
						if (!combinations.combinaciones) {
							throw new BadRequestException("Product combinations not found")
						}

						const decodedCombinations: Combination[] = JSON.parse(combinations.combinaciones)

						decodedCombinations.forEach((c) => {
							if (c.combinacion === producto.combinacion && c.precio === producto.precio) {
								producto.precio = c.precio
								producto.combinacion = c.combinacion

								if (producto.cantidad > c.unidades) {
									throw new BadRequestException(`Product ${nombre} has not enough stock`)
								}

								c.unidades -= producto.cantidad
							}
						})
						combinations.combinaciones = JSON.stringify(decodedCombinations)
						await queryRunner.manager.save(combinations)
					} else {
						const productInfo = await this.productosInfoRepository.findOne({
							where: { id }
						})

						if (!productInfo) throw new BadRequestException("Product info not found")

						let { inventario } = productInfo

						if (!inventario) throw new BadRequestException("Product inventory not found")

						if (producto.cantidad > inventario) {
							throw new BadRequestException(`Product ${nombre} has not enough stock`)
						}

						inventario -= producto.cantidad
						productInfo.inventario = inventario
						await queryRunner.manager.save(productInfo)
					}

					const productCart = new ProductosCarritos()
					productCart.carrito = cart.id
					productCart.producto = id
					productCart.unidades = producto.cantidad

					if (producto.combinacion) {
						productCart.variantes = JSON.stringify(producto.combinacion)
					}

					if ("precio" in product && producto.precio != 0 && producto.precio !== null) {
						productCart.precioProducto = producto.precio
					} else {
						productCart.precioProducto = 0
					}
					await queryRunner.manager.save(productCart)
				})
			)

			this.logger.log("Stock verified")

			if (comentario && usuario) {
				await queryRunner.manager.save(this.saveMessageOrder(comentario, cart.id, usuario))
			}

			this.logger.log("Message saved")

			await this.isClientRegistered(usuario, tienda, CLIENT_ASSIGNATION_METHOD.ORDER)

			this.logger.log("Client registered")
			// TODO: Send email to client
			// ?: Send sms to client
			await queryRunner.commitTransaction()

			this.logger.log("Transaction commited")
		} catch (error) {
			await queryRunner.rollbackTransaction()
			this.logger.error(`Transaction rolled back: ${error}`)
			throw new InternalServerErrorException("Error creating order")
		} finally {
			await queryRunner.release()
			this.logger.log("QueryRunner released")
		}
	}

	async isClientRegistered(userId: number, tiendaId: number, method: CLIENT_ASSIGNATION_METHOD) {
		const client = await this.clientesRepository.findOne({ where: { userId, tiendaId } })
		if (client && method === CLIENT_ASSIGNATION_METHOD.CREATE) {
			throw new ConflictException("Client already registered")
		}
		if (
			(!client && method === CLIENT_ASSIGNATION_METHOD.ORDER) ||
			method === CLIENT_ASSIGNATION_METHOD.CREATE
		) {
			await this.assignClient(userId, tiendaId)
			return client
		}
	}

	async assignClient(userId: number, tiendaId: number) {
		const client = new Clientes()
		client.userId = userId
		client.tiendaId = tiendaId
		client.createdAt = new Date()

		return await this.clientesRepository.save(client)
	}

	async saveMessageOrder(comment: string, cartId: number, userId: number) {
		const message = new MensajeOrden()
		message.mensaje = comment
		message.rol = "cliente"
		message.carritoId = cartId
		message.userId = userId
		message.createdAt = new Date()

		return message
	}

	async createCart(data: CreateOrderDto) {
		const cart = new Carritos()
		cart.tipo = data.tipo
		cart.tienda = data.tienda
		cart.usuario = data.usuario
		cart.resellerId = data.reseller || null
		cart.fecha = new Date().toISOString()
		cart.createdAt = new Date()
		cart.updatedAt = new Date()
		cart.total = data.total
		cart.costoEnvio = data.costo_envio
		cart.metodoPago = data.metodo_pago
		cart.estado = this.getOrderStatus(data.tipo, data.metodo_pago, data.canal)
		cart.canal = data.canal
		cart.direccionEntrega = JSON.stringify(data.direccion_entrega)
		cart.takeout = data.takeout
		cart.estadoEntrega = data.estado_entrega
		cart.ip = data.ip
		cart.comentario = data.comentario
		cart.cupon = data.cupon
		cart.descuento = data.descuento

		return cart
	}

	getOrderStatus(tipo: boolean, metodoPago: string, canal: string) {
		if (tipo === true) {
			return "8"
		}

		if (metodoPago === "6" && canal === "4") {
			return "1"
		}

		return "0"
	}
}
