import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { MedioPagos, Tiendas } from "src/entities"
import { Repository } from "typeorm"

import { StoreIntegrationEntity } from "../../domain/entities"

@Injectable()
export class MySqlStoreIntegrationsService {
	constructor(
		@InjectRepository(MedioPagos) private medioPagosRepository: Repository<MedioPagos>,
		@InjectRepository(Tiendas) private tiendasRepository: Repository<Tiendas>
	) {}
	async getStoreIntegrations(storeId: number): Promise<StoreIntegrationEntity[]> {
		const paymentMethods = await this.medioPagosRepository.findOne({
			where: { idMedios: storeId }
		})

		const otherIntegrations = await this.tiendasRepository.findOne({
			where: { id: storeId },
			relations: {
				miPaqueteCredenciales: true,
				apisConexiones: true,
				tiendaHokos: true,
				tiendaCubikos: true
			}
		})

		if (!paymentMethods) return []

		return [
			{
				integrationName: "ADDI",
				connected: Boolean(paymentMethods.addi)
			},
			{
				integrationName: "MERCADO_PAGO",
				connected: Boolean(paymentMethods.mercadoPago)
			},
			{
				integrationName: "PAYU",
				connected: Boolean(paymentMethods.payu)
			},
			{
				integrationName: "WOMPI",
				connected: Boolean(paymentMethods.wompi)
			},
			{
				integrationName: "WEPAY4U",
				connected: Boolean(paymentMethods.wepay4u)
			},
			{
				integrationName: "TU_COMPRA",
				connected: Boolean(paymentMethods.tuCompra)
			},
			{
				integrationName: "EPAYCO",
				connected: Boolean(paymentMethods.payco)
			},
			{
				integrationName: "FLOW",
				connected: Boolean(paymentMethods.flow)
			},
			{
				integrationName: "MI_PAQUETE",
				connected: otherIntegrations?.miPaqueteCredenciales ? true : false
			},
			{
				integrationName: "HOKO",
				connected: otherIntegrations?.tiendaHokos ? true : false
			},
			{
				integrationName: "GOOGLE_ANALYTICS",
				connected: otherIntegrations?.apisConexiones[0]?.analytics ? true : false
			},
			{
				integrationName: "GOOGLE_TAG_MANAGER",
				connected: otherIntegrations?.apisConexiones[0]?.tagManager ? true : false
			},
			{
				integrationName: "FACEBOOK_PIXEL",
				connected: otherIntegrations?.apisConexiones[0]?.pixelFacebook ? true : false
			},
			{
				integrationName: "TIDIO",
				connected: otherIntegrations?.apisConexiones[0]?.tidioUser ? true : false
			},
			{
				integrationName: "CUBIKO",
				connected: otherIntegrations?.tiendaCubikos ? true : false
			},
			{
				integrationName: "GOOGLE_MERCHANT",
				connected: otherIntegrations?.apisConexiones[0]?.googleMerchant ? true : false
			},
			{
				integrationName: "FACEBOOK_CHAT",
				connected: otherIntegrations?.apisConexiones[0]?.facebookChat ? true : false
			},
			{
				integrationName: "PAYMENTS_WAY",
				connected: otherIntegrations?.tiendaPaymentsways ? true : false
			}
		]
	}
}
