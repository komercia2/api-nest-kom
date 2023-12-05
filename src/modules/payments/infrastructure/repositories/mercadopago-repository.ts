import { Inject } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import axios from "axios"
import { MercadoPagoConfig, Preference } from "mercadopago"
import { Items } from "mercadopago/dist/clients/commonTypes"
import { BackUrls } from "mercadopago/dist/clients/preference/commonTypes"
import { Logger } from "nestjs-pino"
import { Carritos, ProductosCarritos, Users } from "src/entities"

import {
	MercadopagoIntegrationStatusEntity,
	MercadopagoPreferenceEntity,
	MercadopagoStoreInfoEntity
} from "../../domain/entities"
import { IMercadopagoRepository } from "../../domain/repositories"
import { MercadopagoPaymentStatus } from "../enums"
import { ClientMercadopagoException, MercadopagoException } from "../errors"
import { MercadoPagoPaymentNotificationGateway } from "../gateways"
import { PaymentsInfrastructureInjectionTokens } from "../payments-infrastructure-injection-token"
import { MySQLMercadopagoService } from "../services"

export class MercadopagoRepository implements IMercadopagoRepository {
	private mercadopagoClient: MercadoPagoConfig = { accessToken: "" }
	private readonly preference = new Preference(this.mercadopagoClient)

	private readonly CURRENCY_ID = "COP"
	private readonly back_urls: BackUrls = {
		success: this.configService.get<string>("SUCCESSFUL_PAYMENT_REDIRECT_URL"),
		failure: this.configService.get<string>("FAILED_PAYMENT_REDIRECT_URL"),
		pending: this.configService.get<string>("PENDING_PAYMENT_REDIRECT_URL")
	}
	private readonly notification_url = this.configService.get<string>("MERCADOPAGO_NOTIFICATION_URL")
	private readonly NODE_ENV = process.env.NODE_ENV

	constructor(
		@Inject(PaymentsInfrastructureInjectionTokens.MySQLMercadopagoService)
		private readonly mercadopagoService: MySQLMercadopagoService,

		private readonly configService: ConfigService,
		private readonly logger: Logger,
		private readonly mercadoPagoPaymentNotificationGateway: MercadoPagoPaymentNotificationGateway
	) {}

	async createIntegration(storeId: number, data: MercadopagoStoreInfoEntity): Promise<boolean> {
		try {
			const activeIntegration = await this.mercadopagoService.getMercadopagoInfo(storeId)

			if (activeIntegration) {
				const entity = MercadopagoStoreInfoEntity.create({
					...data,
					createdAt: activeIntegration.createdAt
				})

				await this.mercadopagoService.updateMercadopagoInfo(storeId, entity)
				return true
			}

			const entity = MercadopagoStoreInfoEntity.create({ ...data })

			await this.mercadopagoService.createIntgration(storeId, entity)

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	}

	/**
	 * @description Get mercadopago integration status from store
	 * @param storeId Store id
	 * @returns Mercadopago integration status
	 * @throws ClientMercadopagoException
	 */
	async getIntegrationStatus(storeId: number): Promise<MercadopagoIntegrationStatusEntity | null> {
		const integrationStatus = await this.mercadopagoService.getMercadopagoInfo(storeId)

		if (!integrationStatus) return null

		const { createdAt, updatedAt, estado, idTienda } = integrationStatus
		const info = MercadopagoIntegrationStatusEntity.create({
			createdAt,
			updatedAt,
			storeId: idTienda,
			status: estado
		})

		return info
	}

	/**
	 * @description Proccess mercadopago payment notification and send notification to store
	 * @param paymentId Mercadopago payment id
	 * @returns void
	 */
	async proccessPayment(paymentId: number): Promise<void> {
		try {
			const { status, external_reference, transaction_amount, currency_id, payment_type_id } =
				await this.fetchPaymentStatus(paymentId)

			const cartId = Number(external_reference)

			const { paymentStatus, mercadopagoStatus } = this.handlePaymentStatus(status)

			if (!paymentStatus) throw new ClientMercadopagoException("INVALID_PAYMENT_STATUS")

			await this.mercadopagoService.updateCartState(cartId, paymentStatus)
			const storeId = await this.mercadopagoService.getStoreIdByCartId(cartId)

			if (!storeId) throw new ClientMercadopagoException("STORE_NOT_FOUND")

			const payload = {
				cartId,
				transaction_amount,
				mercadopagoStatus,
				currency_id,
				payment_type_id
			}

			this.mercadoPagoPaymentNotificationGateway.sendPaymentNotificationToStore(
				storeId,
				JSON.stringify(payload)
			)

			console.log(`MERCADOPAGO PAYMENT STATUS: ${status}`)
		} catch (error) {
			throw error
		}
	}

	/**
	 * @description Create mercadopago preference and send notification to store
	 * @param cartId  Cart id
	 * @returns  Mercadopago preference
	 */
	async createPreference(cartId: number): Promise<MercadopagoPreferenceEntity | null> {
		try {
			const cart = await this.mercadopagoService.getCartProducts(cartId)

			const { tienda, productosCarritos, usuario2, total, metodoPago } = this.validateCart(cart)

			const storeMercadopagoInfo = await this.mercadopagoService.getMercadopagoInfo(tienda)

			if (!storeMercadopagoInfo) throw new ClientMercadopagoException("STORE_NOT_FOUND")

			const { accessToken } = storeMercadopagoInfo

			this.mercadopagoClient.accessToken = this.getAccessToken(accessToken)

			const items = productosCarritos.map(this.toPreferenceItems)

			const preference = await this.getMercadopagoPreference(cartId, items, usuario2)

			const { id, init_point, sandbox_init_point } = preference

			if (!id || !init_point || !sandbox_init_point) {
				throw new MercadopagoException("PREFERENCE_NOT_CREATED")
			}

			const totalItems = this.getOrderProductsAmount(productosCarritos)

			this.mercadoPagoPaymentNotificationGateway.sendPreferenceCreatedToStore(
				tienda,
				JSON.stringify({
					cartId,
					totalItems,
					totalPrice: total,
					paymentMethod: metodoPago
				})
			)

			return {
				preferenceId: id,
				init_point,
				sandbox_init_point
			}
		} catch (error) {
			this.logger.error("Error creating mercadopago preference", error)
			throw error
		}
	}

	/**
	 * Utils
	 */

	/**
	 * @description Get mercadopago access token
	 * @param storeAccessToken Store access token
	 * @returns Mercadopago access token (sandbox or production)
	 */
	private getAccessToken = (storeAccessToken: string) => {
		if (this.NODE_ENV === "production") return storeAccessToken

		return this.configService.get<string>("MERCADOPAGO_ACCESS_TOKEN") as string
	}

	/**
	 * @description Fetch payment status from mercadopago
	 * @param paymentId Mercadopago payment id
	 * @returns Payment status
	 */
	private fetchPaymentStatus = async (paymentId: number) => {
		try {
			const { data } = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
				headers: {
					Authorization: `Bearer ${this.configService.get<string>("MERCADOPAGO_ACCESS_TOKEN")}`
				}
			})
			const { status, external_reference, transaction_amount, currency_id, payment_type_id } = data

			return { status, external_reference, transaction_amount, currency_id, payment_type_id }
		} catch (error) {
			this.logger.error("Error fetching payment status", error)
			throw new ClientMercadopagoException("PAYMENT_NOT_FOUND")
		}
	}

	/**
	 * @description Handle mercadopago payment status
	 * @param mercadopagoStatus  Mercadopago payment status
	 * @returns Payment status and mercadopago status
	 */
	private handlePaymentStatus = (mercadopagoStatus: string) => {
		let paymentStatus: string | undefined
		if (mercadopagoStatus === MercadopagoPaymentStatus.APPROVED) {
			paymentStatus = "1"
		}
		if (mercadopagoStatus === MercadopagoPaymentStatus.IN_PROCESS) {
			paymentStatus = "9"
		}
		if (mercadopagoStatus === MercadopagoPaymentStatus.CANCELLED) {
			paymentStatus = "3"
		}
		if (mercadopagoStatus === MercadopagoPaymentStatus.REJECTED) {
			paymentStatus = "10"
		}

		return { paymentStatus, mercadopagoStatus }
	}

	/**
	 * @description Get order products amount
	 * @param products Order products
	 * @returns Order products amount (total items)
	 */
	private getOrderProductsAmount = (products: ProductosCarritos[]) => {
		return products.reduce((acc, el) => acc + el.unidades, 0)
	}

	/**
	 * @description Get mercadopago preference
	 * @param cartId
	 * @param items
	 * @param user
	 * @returns Mercadopago preference
	 */
	private getMercadopagoPreference = async (cartId: number, items: Items[], user: Users) => {
		const preference = await this.preference.create({
			body: {
				items,
				back_urls: this.back_urls,
				binary_mode: true,
				auto_return: "approved",
				external_reference: String(cartId),
				statement_descriptor: "Komercia",
				notification_url: this.notification_url,
				payer: {
					name: user.nombre,
					email: user.email ?? ""
				}
			}
		})
		return preference
	}

	/**
	 * @description Validate cart
	 * @param cart Cart
	 * @returns Cart validated
	 */
	private validateCart(cart: Carritos | null) {
		if (!cart) throw new ClientMercadopagoException("CAR_NOT_FOUND")
		if (cart.estado === "1") throw new ClientMercadopagoException("CAR_ALREADY_PAID")
		if (cart.metodoPago === "25") throw new ClientMercadopagoException("INVALID_PAYMENT_METHOD")
		return { ...cart }
	}

	/**
	 * @description Transform cart products to mercadopago items
	 * @returns Mercadopago items from cart products
	 */
	toPreferenceItems = ({
		producto2,
		precioProducto,
		unidades,
		carrito
	}: ProductosCarritos): Items => ({
		id: String(carrito),
		quantity: unidades,
		title: `Komercia | Orden #${carrito}`,
		unit_price: precioProducto,
		category_id: producto2.categoriaProducto.toString(),
		currency_id: this.CURRENCY_ID,
		picture_url: producto2.fotoCloudinary
	})
}
