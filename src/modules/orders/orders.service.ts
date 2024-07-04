import {
	BadRequestException,
	ConflictException,
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import * as crypto from "crypto"
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
	TiendaPayuInfo,
	Tiendas,
	TiendasInfo,
	Users
} from "src/entities"
import { DataSource, Repository } from "typeorm"
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity"

// import { sendWhatsappMessage } from "../common/infrastructure/services/whatsapp-service"
import { MailsService } from "../mails/mails.service"
import { WhatsappService } from "../whatsapp/whatsapp.service"
import logos from "./constants/logos"
import { CreateOrderDto } from "./dtos/create-order-dto"
import { CreatePayUOrderDto } from "./dtos/create-payu-order.dto"
import { GetOrderDto } from "./dtos/get-order-dto"
import { UpdateOrderStatusDto } from "./dtos/update-order-status.dto"
import { OrderEmailDto } from "./interfaces/send-order-mail.interface"
import { prettifyShippingMethod } from "./utils/prettifyShippingMethod"

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

		@InjectRepository(TiendasInfo) private readonly tiendasInfoRepository: Repository<TiendasInfo>,

		@InjectRepository(Tiendas) private readonly tiendas: Repository<Tiendas>,

		@InjectRepository(TiendaPayuInfo) private readonly tiendaPayuInfo: Repository<TiendaPayuInfo>,

		private readonly datasource: DataSource,

		private readonly logger: Logger,

		private readonly mailsService: MailsService,

		private readonly whatsappService: WhatsappService
	) {}

	async cratePayUOrder(data: CreatePayUOrderDto) {
		const { cartId, storeId, total } = data

		const cart = await this.carritosRepository.findOne({ where: { id: cartId, tienda: storeId } })

		if (!cart) throw new BadRequestException("Cart not found")

		const store = await this.tiendasInfoRepository.findOne({ where: { tiendaInfo: storeId } })

		if (!store) throw new BadRequestException("Store not found")

		const storePayUInfo = await this.tiendaPayuInfo.findOne({ where: { tiendaId: storeId } })

		if (!storePayUInfo) throw new BadRequestException("Store PayU info not found")

		const { apiKey, merchantId, accountId } = storePayUInfo

		const signature = crypto
			.createHash("md5")
			.update(`${apiKey}~${merchantId}~${cartId}~${total}~COP`)
			.digest("hex")

		return {
			merchantId,
			accountId,
			signature
		}
	}

	async updateOrderStatus(updateOrderStatusDto: UpdateOrderStatusDto) {
		const { orderId, userId, status, method } = updateOrderStatusDto

		const order = await this.carritosRepository.findOne({ where: { id: orderId, usuario: userId } })

		if (!order) throw new NotFoundException("Order not found")

		order.estado = status
		order.metodoPago = method
		order.updatedAt = new Date()

		await this.carritosRepository.save(order)
	}

	async getOrder(getOrderDto: GetOrderDto) {
		const { orderId, storeId, userId } = getOrderDto

		const order = await this.carritosRepository
			.createQueryBuilder("carritos")
			.leftJoinAndSelect("carritos.productosCarritos", "productosCarritos")
			.leftJoinAndSelect("productosCarritos.producto2", "producto2")
			.leftJoinAndSelect("carritos.mensajeOrdens", "mensajeOrdens")
			.leftJoin("mensajeOrdens.user", "user_message")
			.leftJoin("producto2.productosInfo", "productosInfo")
			.leftJoin("mensajeOrdens.user", "user")
			.leftJoinAndSelect("user.usersInfo", "usersInfo")
			.leftJoinAndSelect("carritos.tienda2", "tienda2")
			.leftJoinAndSelect("tienda2.tiendasInfo", "tiendasInfo")
			.leftJoinAndSelect("tiendasInfo.paises", "paises")
			.leftJoinAndSelect("tienda2.mediosEnvios", "mediosEnvios")
			.addSelect([
				"productosInfo.id",
				"productosInfo.sku",
				"user.id",
				"user.nombre",
				"user.email",
				"user.identificacion",
				"user.ciudad",
				"user.tipoIdentificacion",
				"paises.id",
				"paises.pais",
				"paises.codigo",
				"paises.indicativo",
				"user_message.id",
				"user_message.nombre",
				"user_message.email",
				"user_message.tipoIdentificacion",
				"user_message.identificacion"
			])
			.where("carritos.id = :orderId", { orderId })
			.andWhere("carritos.tienda = :storeId", { storeId })
			.andWhere("carritos.usuario = :userId", { userId })
			.getOne()

		if (!order) {
			throw new BadRequestException("Order not found")
		}

		return order
	}

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
					const { id, nombre, activo } = producto

					const product = await this.productosRepository.findOne({ where: { id, tienda } })

					if (!product) throw new BadRequestException("Product not found")
					if (activo === 0) throw new BadRequestException(`Product ${nombre} is not active`)

					if (product.conVariante) {
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
							const strProductCombinacion = JSON.stringify(producto.combinacion)
							const strCurrentCombination = JSON.stringify(c.combinacion)

							if (
								strCurrentCombination === strProductCombinacion &&
								+c.precio === +producto.precio
							) {
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

					const productCart: QueryDeepPartialEntity<ProductosCarritos> = {
						carrito: cart.id,
						producto: id,
						unidades: producto.cantidad
					}
					// productCart.carrito = cart.id
					// productCart.producto = id
					// productCart.unidades = producto.cantidad

					if (producto.combinacion) {
						productCart.variantes = JSON.stringify(producto.combinacion)
					}

					if ("precio" in product && producto.precio != 0 && producto.precio !== null) {
						productCart.precioProducto = producto.precio
					} else {
						productCart.precioProducto = 0
					}
					await queryRunner.manager.insert(ProductosCarritos, productCart)
				})
			)

			this.logger.log("Stock verified")

			if (comentario) {
				const message = await this.createOrderMessage(comentario, cart.id, usuario)
				await queryRunner.manager.save(message)
				this.logger.log("Message created")
			}

			try {
				await this.isClientRegistered(usuario, tienda, CLIENT_ASSIGNATION_METHOD.ORDER)
			} catch (error) {
				this.logger.error(`Error registering client: ${error}`)
			}

			this.logger.log("Client registered")

			await queryRunner.commitTransaction()

			this.logger.log("Transaction commited")

			const { datosTienda } = createOrderDto

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const notificationsTasks = []

			if (createOrderDto?.emailCliente) {
				const emailCliente = createOrderDto.emailCliente
				const clientEmailData: OrderEmailDto = {
					...(await this.formatDataForEmail(createOrderDto, cart, true))
				}
				notificationsTasks.push(this.sendOrderEmail(emailCliente, tienda, clientEmailData))
			}

			if (datosTienda?.email_tienda) {
				const emailTienda = datosTienda.email_tienda
				const storeEmailData: OrderEmailDto = {
					...(await this.formatDataForEmail(createOrderDto, cart, false))
				}
				notificationsTasks.push(this.sendOrderEmail(emailTienda, tienda, storeEmailData))
			}

			if (datosTienda?.telefono) {
				const whatsappStoreMessage = `🔔Nueva venta en tu tienda\n¡Hola, ${datosTienda.nombre}! 🌟 Acabas de recibir un nuevo pedido con el número de orden *#${cart.id}* por un total de *$${cart.total}* 🛍️. ¡Revísalo pronto! 💪🏼🥳.\nPuedes ingresar a tu panel de control para ver todos los detalles de la venta 🔍.\n💜 Enviado por Komercia.`
				notificationsTasks.push(
					this.whatsappService.sendWhatsappMessage(datosTienda.telefono, whatsappStoreMessage)
				)
			}

			notificationsTasks.push(
				this.whatsappService.sendMessageToGroup(
					JSON.stringify(createOrderDto),
					"Testing Stores Created"
				)
			)

			try {
				await Promise.allSettled(notificationsTasks)

				this.logger.log("Emails sent to store and client")
			} catch (error) {
				this.logger.error(`Error sending emails: ${error}`)
			}

			return cart
		} catch (error) {
			console.log(error)
			await queryRunner.rollbackTransaction()
			this.logger.error(`Transaction rolled back: ${error}`)
			if (error instanceof BadRequestException) {
				throw error
			}

			if (error instanceof ConflictException) {
				throw error
			}

			if (error instanceof InternalServerErrorException) {
				throw error
			}

			if (error instanceof Error) {
				throw new InternalServerErrorException("Internal server error")
			}
		} finally {
			await queryRunner.release()
			this.logger.log("QueryRunner released")
		}
	}

	private async sendOrderEmail(email: string, storeId: number, data: OrderEmailDto) {
		return await this.mailsService.sendCustomEmail({
			to: email,
			storeId,
			templateId: "d-31bcbff48b1841f29782d02a9904a177",
			dynamicTemplateData: data
		})
	}

	private async formatDataForEmail(data: CreateOrderDto, cart: Carritos, isClient: boolean) {
		const { total, datosTienda, costo_envio, descuento, direccion_entrega } = data
		const { id: IdOrden, fecha, metodoPago, usuario } = cart

		const URL_store = await this.getStoreURL(data, IdOrden, usuario)
		const isDataShipping = this.isDataShipping(direccion_entrega.type)

		const storeEmailData: OrderEmailDto = {
			logo: `https://api2.komercia.co/logos/${datosTienda.logo}`,
			logoKomercia: logos.logoKomercia,
			logoKomerciaWhite: logos.logoKomerciaWhite,
			isClient,
			IdOrden,
			total: total.toString(),
			data: {
				venta: {
					URL_order: `https://panel.komercia.co/ventas/listado/${IdOrden}`,
					URL_store,
					id: IdOrden,
					canal: data.canal === 1 ? "WhatsApp" : "Checkout",
					direccion_entrega: direccion_entrega.value,
					costo_envio,
					descuento,
					fecha: new Date(fecha).toLocaleString(),
					method_shipping: prettifyShippingMethod(metodoPago),
					tienda_venta: { ...datosTienda, email_tienda: datosTienda.email_tienda || "" },
					total: cart.total,
					usuario: {
						identificacion: "",
						nombre: direccion_entrega?.value?.nombre ?? "",
						tipo_identificacion: ""
					},
					isDataShipping
				},

				productos: data.productos.map((p) => ({
					cantidad: p.cantidad,
					combinacion: p.combinacion,
					foto_cloudinary: p.foto_cloudinary,
					id: p.id,
					nombre: p.nombre,
					precio: p.precio
				}))
			}
		}
		return storeEmailData
	}

	private isDataShipping(shippingAddressType: number) {
		return shippingAddressType === 1
	}

	private async getStoreURL(orderData: CreateOrderDto, orderId: number, userId: number) {
		const domain = orderData.datosTienda.dominio
		const subdomain = orderData.datosTienda.subdominio

		if (orderData.usuario === 1003915188) {
			return `https://wapi.me/wa/${orderData.tienda}/micompra?orden=${orderId}&usuario=1003915188`
		}

		const identification = await this.getUserIdentificacion(userId)

		if (orderData.datosTienda.dominio) {
			return `${domain}/micompra?orden=${orderId}&usuario=${identification}`
		}

		return `https://${subdomain}.komercia.store/micompra?orden=${orderId}&usuario=${identification}`
	}

	async getUserIdentificacion(userId: number) {
		const user = await this.usersRepository.findOne({ where: { id: userId } })

		if (!user) {
			throw new BadRequestException("User not found")
		}

		return user.identificacion
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

	async createOrderMessage(comment: string, cartId: number, userId: number) {
		const message = new MensajeOrden()
		message.mensaje = comment
		message.rol = "1"
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
		cart.estado = this.getOrderStatus(data.tipo, data.metodo_pago, String(data.canal))
		cart.canal = String(data.canal)
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
