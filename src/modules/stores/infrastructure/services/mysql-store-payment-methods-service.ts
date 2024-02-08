import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import {
	MedioPagos,
	StoreAddiCredentials,
	TiendaCredibancoInfo,
	TiendaEpaycoInfo,
	TiendaFlowInfo,
	TiendaMercadoPagoInfo,
	TiendaPaymentsway,
	TiendaPayuInfo,
	TiendaTucompraInfo,
	TiendaWepay4uInfo,
	TiendaWompiInfo
} from "src/entities"
import { MercadopagoIntegrationStatusEntity } from "src/modules/payments/domain/entities"
import { Repository } from "typeorm"

import { StorePaymentMethodsWithoutAuthDto } from "../../domain/dtos"
import { FindPaymentMethodWithCredentialsDto } from "../../domain/dtos/find-payment-method-with-credentials-dto"
import { PayUEntity } from "../../domain/entities"
import { StorePaymentGateawayMethods } from "../../domain/enums/store-payment-gateaway-methods"
import { StorePaymentGateWay } from "../../domain/types/store-payment-gateways-type"

@Injectable()
export class MySQLStorePaymentMethodsService {
	constructor(
		@InjectRepository(MedioPagos)
		private readonly medioPagosRepository: Repository<MedioPagos>,

		@InjectRepository(TiendaPayuInfo)
		private readonly tiendaPayuInfoRepository: Repository<TiendaPayuInfo>,

		@InjectRepository(TiendaCredibancoInfo)
		private readonly tiendaCredibancoInfoRepository: Repository<TiendaCredibancoInfo>,

		@InjectRepository(TiendaEpaycoInfo)
		private readonly tiendaEpaycoInfoRepository: Repository<TiendaEpaycoInfo>,

		@InjectRepository(TiendaPaymentsway)
		private readonly tiendaPaymentswayRepository: Repository<TiendaPaymentsway>,

		@InjectRepository(TiendaTucompraInfo)
		private readonly tiendaTucompraInfoRepository: Repository<TiendaTucompraInfo>,

		@InjectRepository(TiendaWepay4uInfo)
		private readonly tiendaWepay4uInfoRepository: Repository<TiendaWepay4uInfo>,

		@InjectRepository(TiendaWompiInfo)
		private readonly tiendaWompiInfoRepository: Repository<TiendaWompiInfo>,

		@InjectRepository(StoreAddiCredentials)
		private readonly storeAddiCredentialsRepository: Repository<StoreAddiCredentials>,

		@InjectRepository(TiendaFlowInfo)
		private readonly tiendaFlowInfoRepository: Repository<TiendaFlowInfo>,

		@InjectRepository(TiendaMercadoPagoInfo)
		private readonly tiendaMercadoPagoInfoRepository: Repository<TiendaMercadoPagoInfo>
	) {}

	async getMethodWithCredentials(storeId: number, dto: FindPaymentMethodWithCredentialsDto) {
		const { paymentGateawayMethod } = dto

		let paymentMethod: StorePaymentGateWay | null = null

		if (paymentGateawayMethod === StorePaymentGateawayMethods.PAYU) {
			paymentMethod = (await this.getPayu(storeId)) as StorePaymentGateWay
		}

		if (paymentGateawayMethod === StorePaymentGateawayMethods.CREDIBANCO) {
			paymentMethod = (await this.getCredibanco(storeId)) as StorePaymentGateWay
		}

		if (paymentGateawayMethod === StorePaymentGateawayMethods.EPAYCO) {
			paymentMethod = (await this.getEpayco(storeId)) as StorePaymentGateWay
		}

		if (paymentGateawayMethod === StorePaymentGateawayMethods.PAYMENTS_WAY) {
			paymentMethod = (await this.getPaymentsWay(storeId)) as StorePaymentGateWay
		}

		if (paymentGateawayMethod === StorePaymentGateawayMethods.TU_COMPRA) {
			paymentMethod = (await this.getTuCompra(storeId)) as StorePaymentGateWay
		}

		if (paymentGateawayMethod === StorePaymentGateawayMethods.WEPAY4U) {
			paymentMethod = (await this.getWepay4u(storeId)) as StorePaymentGateWay
		}

		if (paymentGateawayMethod === StorePaymentGateawayMethods.WOMPI) {
			paymentMethod = (await this.getWompi(storeId)) as StorePaymentGateWay
		}

		if (paymentGateawayMethod === StorePaymentGateawayMethods.ADDI) {
			paymentMethod = (await this.getAddi(storeId)) as StorePaymentGateWay
		}

		if (paymentGateawayMethod === StorePaymentGateawayMethods.FLOW) {
			paymentMethod = (await this.getFlow(storeId)) as StorePaymentGateWay
		}

		if (paymentGateawayMethod === StorePaymentGateawayMethods.MERCADOPAGO) {
			paymentMethod = (await this.getMercadopago(storeId)) as StorePaymentGateWay
			const integrationStatus = await this.getIntegrationStatus(storeId)

			if (paymentMethod && integrationStatus) {
				paymentMethod = {
					...paymentMethod,
					integrationStatus
				}
			}
		}

		return paymentMethod
	}

	async getIntegrationStatus(storeId: number) {
		const integrationStatus = await this.getMercadopago(storeId)

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

	private async getMercadopago(storeId: number) {
		const mercadopago = await this.tiendaMercadoPagoInfoRepository.findOne({
			where: { idTienda: storeId }
		})

		return mercadopago ? mercadopago : null
	}

	private async getFlow(storeId: number) {
		const flow = await this.tiendaFlowInfoRepository.findOne({
			where: { tiendasId: storeId }
		})

		return flow ? flow : null
	}

	private async getAddi(storeId: number) {
		const addi = await this.storeAddiCredentialsRepository.findOne({
			where: { storeId }
		})

		return addi ? addi : null
	}

	private async getWepay4u(storeId: number) {
		const wepay4u = await this.tiendaWepay4uInfoRepository.findOne({
			where: { tiendasId: storeId }
		})

		return wepay4u ? wepay4u : null
	}

	private async getPaymentsWay(storeId: number) {
		const paymentsWay = await this.tiendaPaymentswayRepository.findOne({
			where: { tiendasId: storeId }
		})

		return paymentsWay ? paymentsWay : null
	}

	private async getTuCompra(storeId: number) {
		const tuCompra = await this.tiendaTucompraInfoRepository.findOne({
			where: { tiendasId: storeId }
		})

		return tuCompra ? tuCompra : null
	}

	private async getWompi(storeId: number) {
		const wompi = await this.tiendaWompiInfoRepository.findOne({
			where: { idTienda: storeId }
		})

		return wompi ? wompi : null
	}

	private async getEpayco(storeId: number) {
		const epayco = await this.tiendaEpaycoInfoRepository.findOne({
			where: { idTienda: storeId }
		})

		return epayco ? epayco : null
	}

	private async getCredibanco(storeId: number) {
		const credibanco = await this.tiendaCredibancoInfoRepository.findOne({
			where: { idTienda: storeId }
		})

		return credibanco ? credibanco : null
	}

	private async getPayu(storeId: number) {
		const payu = await this.tiendaPayuInfoRepository.findOne({
			where: { tiendaId: storeId }
		})

		return payu ? PayUEntity.fromPersistence(payu) : null
	}

	async getWithoutAuth(storeId: number) {
		const mediosPagos = await this.medioPagosRepository.findOne({
			where: { idMedios2: { id: storeId } },
			relations: {
				idMedios2: {
					tiendaConsignacionInfos: { bancos: true },
					politicas: true,
					tiendaEfectyInfos: true,
					tiendaNequiInfos: true,
					tiendaDaviplataInfos: true,
					tiendaContraentregaInfos: true
				}
			}
		})

		return StorePaymentMethodsWithoutAuthDto.fromPersistence({
			...mediosPagos,
			contraentrega: {
				...mediosPagos?.idMedios2.tiendaContraentregaInfos[0],
				estado: mediosPagos?.contraentrega
			},
			consignacion: {
				...mediosPagos?.idMedios2.tiendaConsignacionInfos[0],
				estado: mediosPagos?.consignacion
			},
			politica_envios: mediosPagos?.idMedios2.politicas.envios ?? null,
			politica_pagos: mediosPagos?.idMedios2.politicas.pagos ?? null,
			nequi: { ...mediosPagos?.idMedios2.tiendaNequiInfos[0], estado: mediosPagos?.nequi },
			daviplata: {
				...mediosPagos?.idMedios2.tiendaDaviplataInfos[0],
				estado: mediosPagos?.daviplata
			},
			efecty: { ...mediosPagos?.idMedios2.tiendaEfectyInfos[0], estado: mediosPagos?.efecty }
		})
	}
}
