import { Inject } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import axios from "axios"
import { MercadoPagoConfig, Preference } from "mercadopago"
import { Items } from "mercadopago/dist/clients/commonTypes"
import { BackUrls } from "mercadopago/dist/clients/preference/commonTypes"
import { Carritos, ProductosCarritos, Users } from "src/entities"

import { MercadopagoPreferenceEntity } from "../../domain/entities"
import { IMercadopagoRepository } from "../../domain/repositories"
import { MercadopagoPaymentStatus } from "../enums"
import { ClientMercadopagoException, MercadopagoException } from "../errors"
import { PaymentsInfrastructureInjectionTokens } from "../payments-infrastructure-injection-token"
import { MySQLMercadopagoService } from "../services"

export class MercadopagoRepository implements IMercadopagoRepository {
	private readonly mercadopagoClient: MercadoPagoConfig = {
		accessToken: this.configService.get<string>("MERCADOPAGO_ACCESS_TOKEN") as string
	}
	private readonly preference = new Preference(this.mercadopagoClient)

	private readonly CURRENCY_ID = "COP"
	private readonly back_urls: BackUrls = {
		success: this.configService.get<string>("SUCCESSFUL_PAYMENT_REDIRECT_URL"),
		failure: this.configService.get<string>("FAILED_PAYMENT_REDIRECT_URL"),
		pending: this.configService.get<string>("PENDING_PAYMENT_REDIRECT_URL")
	}
	private readonly notification_url = this.configService.get<string>("MERCADOPAGO_NOTIFICATION_URL")

	constructor(
		@Inject(PaymentsInfrastructureInjectionTokens.MySQLMercadopagoService)
		private readonly mercadopagoService: MySQLMercadopagoService,

		private readonly configService: ConfigService
	) {}

	async proccessPayment(paymentId: number): Promise<void> {
		try {
			const paymentInfo = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
				headers: {
					Authorization: `Bearer ${this.configService.get<string>("MERCADOPAGO_ACCESS_TOKEN")}`
				}
			})
			const { status, external_reference } = paymentInfo.data

			const cartId = Number(external_reference)

			const paymentStatus = this.handlePaymentStatus(status)

			if (!paymentStatus) throw new ClientMercadopagoException("INVALID_PAYMENT_STATUS")

			await this.mercadopagoService.updateCartState(cartId, paymentStatus)

			console.log(`MERCADOPAGO PAYMENT STATUS: ${status}`)
		} catch (error) {
			throw error
		}
	}

	async createPreference(cartId: number): Promise<MercadopagoPreferenceEntity | null> {
		try {
			const cart = await this.mercadopagoService.getCartProducts(cartId)

			const { tienda, productosCarritos, usuario2 } = this.validateCart(cart)

			const storeMercadopagoInfo = await this.mercadopagoService.getMercadopagoInfo(tienda)

			if (!storeMercadopagoInfo) throw new ClientMercadopagoException("STORE_NOT_FOUND")

			const items = productosCarritos.map(this.toPreferenceItems)

			const preference = await this.getMercadopagoPreference(cartId, items, usuario2)

			const { id, init_point } = preference

			if (!id || !init_point) throw new MercadopagoException("PREFERENCE_NOT_CREATED")

			return {
				preferenceId: id,
				init_point
			}
		} catch (error) {
			throw error
		}
	}

	/**
	 * Utils
	 */

	private handlePaymentStatus = (status: string) => {
		if (status === MercadopagoPaymentStatus.APPROVED) return "1"
		if (status === MercadopagoPaymentStatus.IN_PROCESS) return "9"
		if (status === MercadopagoPaymentStatus.CANCELLED) return "3"
		if (status === MercadopagoPaymentStatus.REJECTED) return "10"
	}

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

	private validateCart(cart: Carritos | null) {
		if (!cart) throw new ClientMercadopagoException("CAR_NOT_FOUND")
		if (cart.estado === "1") throw new ClientMercadopagoException("CAR_ALREADY_PAID")
		if (cart.metodoPago === "25") throw new ClientMercadopagoException("INVALID_PAYMENT_METHOD")
		return { ...cart }
	}

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
