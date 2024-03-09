import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { SHA256 } from "crypto-js"
import {
	MedioPagos,
	StoreAddiCredentials,
	TiendaConsignacionInfo,
	TiendaContraentregaInfo,
	TiendaCredibancoInfo,
	TiendaDaviplataInfo,
	TiendaEfectyInfo,
	TiendaEpaycoInfo,
	TiendaFlowInfo,
	TiendaMercadoPagoInfo,
	TiendaNequiInfo,
	TiendaPaymentsway,
	TiendaPayuInfo,
	TiendaTucompraInfo,
	TiendaWepay4uInfo,
	TiendaWompiInfo
} from "src/entities"
import {
	MercadopagoIntegrationStatusEntity,
	MercadopagoStoreInfoEntity
} from "src/modules/payments/domain/entities"
import { Repository } from "typeorm"

import { EncryptWompiIntegrityDto, StorePaymentMethodsWithoutAuthDto } from "../../domain/dtos"
import { ChangePaymentGatewayStatus } from "../../domain/dtos/change-payment-gateway-status.dto"
import { FindPaymentMethodWithCredentialsDto } from "../../domain/dtos/find-payment-method-with-credentials-dto"
import {
	PayUEntity,
	StoreAddiEntity,
	StoreCredibancoEntity,
	StoreEpaycoEntity,
	StoreFlowEntity,
	StorePaymentsWayEntity,
	StoreTuCompraEntity,
	StoreWePay4uEntity,
	StoreWompiEntity
} from "../../domain/entities"
import { BankConsignmmentEntity } from "../../domain/entities/payment-methods/bank-consignment-entity"
import { CashOnDelivery } from "../../domain/entities/payment-methods/cash-on-delivery-entity"
import { StoreDaviplataEntity } from "../../domain/entities/payment-methods/store-daviplata-entity"
import { EfectyStoreEntity } from "../../domain/entities/payment-methods/store-efecty-entity"
import { StoreNequiEntity } from "../../domain/entities/payment-methods/store-nequi-entity"
import { ChangePaymentGatewayStatusOptions } from "../../domain/enums/change-payment-gateway-status"
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
		private readonly tiendaMercadoPagoInfoRepository: Repository<TiendaMercadoPagoInfo>,

		@InjectRepository(TiendaContraentregaInfo)
		private readonly tiendaContraentregaInfoRepository: Repository<TiendaContraentregaInfo>,

		@InjectRepository(TiendaConsignacionInfo)
		private readonly tiendaConsignacionInfoRepository: Repository<TiendaConsignacionInfo>,

		@InjectRepository(TiendaEfectyInfo)
		private readonly tiendaEfectyInfoRepository: Repository<TiendaEfectyInfo>,

		@InjectRepository(TiendaNequiInfo)
		private readonly tiendaNequiInfoRepository: Repository<TiendaNequiInfo>,

		@InjectRepository(TiendaDaviplataInfo)
		private readonly tiendaDaviplataInfoRepository: Repository<TiendaDaviplataInfo>
	) {}

	async encryptWompiIntegrity(data: EncryptWompiIntegrityDto) {
		const { reference, transactionAmount, currency, storeId } = data

		const wompiIntegrity = await this.getWompi(storeId)

		if (!wompiIntegrity) throw new NotFoundException("Wompi credentials not found")

		const { integrity } = wompiIntegrity

		const integrityString = `${reference}${transactionAmount}${currency}${integrity}`

		const integrityHash = SHA256(integrityString).toString()

		return integrityHash
	}

	async createPaymentGateway(
		storeId: number,
		method: FindPaymentMethodWithCredentialsDto,
		data: StorePaymentGateWay
	) {
		const { paymentGateawayMethod: pMethod } = method

		try {
			if (pMethod === StorePaymentGateawayMethods.PAYU) {
				const payu = data as unknown as PayUEntity
				await this.tiendaPayuInfoRepository.insert({
					...payu,
					tiendaId: storeId
				})
			}

			if (pMethod === StorePaymentGateawayMethods.CREDIBANCO) {
				const credibanco = data as StoreCredibancoEntity
				await this.tiendaCredibancoInfoRepository.insert({
					...credibanco,
					idTienda: storeId,
					createdAt: new Date()
				})
			}

			if (pMethod === StorePaymentGateawayMethods.EPAYCO) {
				const epayco = data as StoreEpaycoEntity
				await this.tiendaEpaycoInfoRepository.insert({
					...epayco,
					idTienda: storeId,
					createdAt: new Date()
				})
			}

			if (pMethod === StorePaymentGateawayMethods.PAYMENTS_WAY) {
				const paymentsWay = data as StorePaymentsWayEntity
				await this.tiendaPaymentswayRepository.insert({
					...paymentsWay,
					tiendasId: storeId
				})
			}

			if (pMethod === StorePaymentGateawayMethods.TU_COMPRA) {
				const tuCompra = data as StoreTuCompraEntity
				await this.tiendaTucompraInfoRepository.insert({
					...tuCompra,
					tiendasId: storeId,
					createdAt: new Date()
				})
			}

			if (pMethod === StorePaymentGateawayMethods.WEPAY4U) {
				const wepay4u = data as StoreWePay4uEntity
				await this.tiendaWepay4uInfoRepository.insert({
					...wepay4u,
					tiendasId: storeId,
					createdAt: new Date()
				})
			}

			if (pMethod === StorePaymentGateawayMethods.WOMPI) {
				const wompi = data as StoreWompiEntity
				await this.tiendaWompiInfoRepository.insert({
					...wompi,
					integrity: wompi.integrity,
					idTienda: storeId,
					createdAt: new Date()
				})
			}

			if (pMethod === StorePaymentGateawayMethods.ADDI) {
				const addi = data as StoreAddiEntity
				await this.storeAddiCredentialsRepository.insert({
					...addi,
					storeId,
					createdAt: new Date()
				})
			}

			if (pMethod === StorePaymentGateawayMethods.FLOW) {
				const flow = data as StoreFlowEntity
				await this.tiendaFlowInfoRepository.insert({
					...flow,
					tiendasId: storeId,
					secretKey: flow.secret_key
				})
			}

			if (pMethod === StorePaymentGateawayMethods.MERCADOPAGO) {
				const mercadopago = data as MercadopagoStoreInfoEntity
				await this.tiendaMercadoPagoInfoRepository.insert({
					...mercadopago,
					idTienda: storeId,
					createdAt: new Date()
				})
			}

			if (pMethod === StorePaymentGateawayMethods.CASH_ON_DELIVERY) {
				const cashOnDelivery = data as CashOnDelivery
				await this.tiendaContraentregaInfoRepository.insert({
					...cashOnDelivery,
					idTienda: storeId,
					createdAt: new Date()
				})
			}

			if (pMethod === StorePaymentGateawayMethods.PICKUP_AND_PAY_IN_STORE) {
				const pickupAndPayInStore = data as { connected: boolean }
				await this.medioPagosRepository.update(storeId, { tienda: pickupAndPayInStore.connected })
			}

			if (pMethod === StorePaymentGateawayMethods.PAYMENT_TO_BE_AGREED) {
				const paymentToBeAgreed = data as { connected: boolean }
				await this.medioPagosRepository.update(storeId, { convenir: paymentToBeAgreed.connected })
			}

			if (pMethod === StorePaymentGateawayMethods.BANK_CONSIGNMENT) {
				const bankConsignment = data as BankConsignmmentEntity
				await this.tiendaConsignacionInfoRepository.insert({
					...bankConsignment,
					tiendaId: storeId,
					createdAt: new Date()
				})
			}

			if (pMethod === StorePaymentGateawayMethods.EFECTY) {
				const efecty = data as EfectyStoreEntity
				await this.tiendaEfectyInfoRepository.insert({
					...efecty,
					tiendaId: storeId,
					createdAt: new Date()
				})
			}

			if (pMethod === StorePaymentGateawayMethods.NEQUI) {
				const nequi = data as StoreNequiEntity
				await this.tiendaNequiInfoRepository.insert({
					referencia: nequi.referencia,
					idTienda: storeId,
					comentario: nequi.comentario,
					createdAt: new Date()
				})
			}

			if (pMethod === StorePaymentGateawayMethods.DAVIPLATA) {
				const daviplata = data as StoreDaviplataEntity
				await this.tiendaDaviplataInfoRepository.insert({
					referencia: daviplata.referencia,
					idTienda: storeId,
					comentario: daviplata.comentario,
					createdAt: new Date()
				})
			}

			return data
		} catch (error) {
			console.log(error)
		}
	}

	async updatePaymentGateway(
		storeId: number,
		method: FindPaymentMethodWithCredentialsDto,
		data: StorePaymentGateWay
	) {
		const { paymentGateawayMethod: pMethod } = method
		try {
			if (pMethod === StorePaymentGateawayMethods.PAYU) {
				const payu = data as unknown as PayUEntity
				await this.tiendaPayuInfoRepository.update(
					{ tiendaId: storeId },
					{
						...payu,
						createdAt: new Date()
					}
				)
			}

			if (pMethod === StorePaymentGateawayMethods.CREDIBANCO) {
				const credibanco = data as StoreCredibancoEntity
				await this.tiendaCredibancoInfoRepository.update(
					{ idTienda: storeId },
					{
						...credibanco,
						createdAt: new Date()
					}
				)
			}

			if (pMethod === StorePaymentGateawayMethods.EPAYCO) {
				const epayco = data as StoreEpaycoEntity
				await this.tiendaEpaycoInfoRepository.update(
					{ idTienda: storeId },
					{
						...epayco,
						createdAt: new Date()
					}
				)
			}

			if (pMethod === StorePaymentGateawayMethods.PAYMENTS_WAY) {
				const paymentsWay = data as StorePaymentsWayEntity
				await this.tiendaPaymentswayRepository.update(
					{ tiendasId: storeId },
					{
						...paymentsWay,
						createdAt: new Date()
					}
				)
			}

			if (pMethod === StorePaymentGateawayMethods.TU_COMPRA) {
				const tuCompra = data as StoreTuCompraEntity
				await this.tiendaTucompraInfoRepository.update(
					{ tiendasId: storeId },
					{
						...tuCompra,
						createdAt: new Date()
					}
				)
			}

			if (pMethod === StorePaymentGateawayMethods.WEPAY4U) {
				const wepay4u = data as StoreWePay4uEntity
				await this.tiendaWepay4uInfoRepository.update(
					{ tiendasId: storeId },
					{
						...wepay4u,
						createdAt: new Date()
					}
				)
			}

			if (pMethod === StorePaymentGateawayMethods.WOMPI) {
				const wompi = data as StoreWompiEntity
				await this.tiendaWompiInfoRepository.update(
					{ idTienda: storeId },
					{
						...wompi,
						createdAt: new Date()
					}
				)
			}

			if (pMethod === StorePaymentGateawayMethods.ADDI) {
				const addi = data as StoreAddiEntity
				await this.storeAddiCredentialsRepository.update(
					{ storeId },
					{
						...addi,
						createdAt: new Date()
					}
				)
			}

			if (pMethod === StorePaymentGateawayMethods.FLOW) {
				const flow = data as StoreFlowEntity
				await this.tiendaFlowInfoRepository.update(
					{ tiendasId: storeId },
					{
						...flow,
						tiendasId: storeId
					}
				)
			}

			if (pMethod === StorePaymentGateawayMethods.MERCADOPAGO) {
				const mercadopago = data as MercadopagoStoreInfoEntity
				await this.tiendaMercadoPagoInfoRepository.update({ idTienda: storeId }, mercadopago)
			}

			if (pMethod === StorePaymentGateawayMethods.CASH_ON_DELIVERY) {
				const cashOnDelivery = data as CashOnDelivery
				await this.tiendaContraentregaInfoRepository.update({ idTienda: storeId }, cashOnDelivery)
			}

			if (pMethod === StorePaymentGateawayMethods.PICKUP_AND_PAY_IN_STORE) {
				const pickupAndPayInStore = data as { connected: boolean }
				await this.medioPagosRepository.update(storeId, { tienda: pickupAndPayInStore.connected })
			}

			if (pMethod === StorePaymentGateawayMethods.PAYMENT_TO_BE_AGREED) {
				const paymentToBeAgreed = data as { connected: boolean }
				await this.medioPagosRepository.update(storeId, { convenir: paymentToBeAgreed.connected })
			}

			if (pMethod === StorePaymentGateawayMethods.BANK_CONSIGNMENT) {
				const bankConsignment = data as BankConsignmmentEntity
				await this.tiendaConsignacionInfoRepository.update({ tiendaId: storeId }, bankConsignment)
			}

			if (pMethod === StorePaymentGateawayMethods.EFECTY) {
				const efecty = data as EfectyStoreEntity
				await this.tiendaEfectyInfoRepository.update({ tiendaId: storeId }, efecty)
			}

			if (pMethod === StorePaymentGateawayMethods.NEQUI) {
				const nequi = data as StoreNequiEntity
				await this.tiendaNequiInfoRepository.update({ idTienda: storeId }, { ...nequi })
			}

			if (pMethod === StorePaymentGateawayMethods.DAVIPLATA) {
				const daviplata = data as StoreDaviplataEntity
				await this.tiendaDaviplataInfoRepository.update({ idTienda: storeId }, { ...daviplata })
			}
		} catch (error) {
			throw new InternalServerErrorException("Error updating payment gateway")
		}
	}

	async changePaymentGatewayStatus(storeId: number, method: ChangePaymentGatewayStatus) {
		const storeHasPaymentMethods = await this.medioPagosRepository.findOne({
			where: { idMedios: storeId }
		})

		if (!storeHasPaymentMethods) {
			throw new NotFoundException("Store has no payment methods or does not exist")
		}
		const { operation: status, paymentGateawayMethod } = method
		const parsedStatus = status === ChangePaymentGatewayStatusOptions.ACTIVATE

		try {
			if (paymentGateawayMethod === StorePaymentGateawayMethods.PAYU) {
				await this.medioPagosRepository.update(storeId, { payu: parsedStatus })
			}

			if (paymentGateawayMethod === StorePaymentGateawayMethods.CREDIBANCO) {
				await this.medioPagosRepository.update(storeId, { credibanco: parsedStatus })
			}

			if (paymentGateawayMethod === StorePaymentGateawayMethods.EPAYCO) {
				await this.medioPagosRepository.update(storeId, { payco: parsedStatus })
			}

			if (paymentGateawayMethod === StorePaymentGateawayMethods.PAYMENTS_WAY) {
				await this.medioPagosRepository.update(storeId, { paymentsWay: parsedStatus })
			}

			if (paymentGateawayMethod === StorePaymentGateawayMethods.TU_COMPRA) {
				await this.medioPagosRepository.update(storeId, { tuCompra: parsedStatus })
			}

			if (paymentGateawayMethod === StorePaymentGateawayMethods.WEPAY4U) {
				await this.medioPagosRepository.update(storeId, { wepay4u: parsedStatus })
			}

			if (paymentGateawayMethod === StorePaymentGateawayMethods.WOMPI) {
				await this.medioPagosRepository.update(storeId, { wompi: parsedStatus })
			}

			if (paymentGateawayMethod === StorePaymentGateawayMethods.ADDI) {
				await this.medioPagosRepository.update(storeId, { addi: parsedStatus })
			}

			if (paymentGateawayMethod === StorePaymentGateawayMethods.FLOW) {
				await this.medioPagosRepository.update(storeId, { flow: parsedStatus })
			}

			if (paymentGateawayMethod === StorePaymentGateawayMethods.MERCADOPAGO) {
				await this.medioPagosRepository.update(storeId, { mercadoPago: parsedStatus })
			}

			if (paymentGateawayMethod === StorePaymentGateawayMethods.CASH_ON_DELIVERY) {
				await this.medioPagosRepository.update(storeId, { contraentrega: parsedStatus })
			}

			if (paymentGateawayMethod === StorePaymentGateawayMethods.PAYMENT_TO_BE_AGREED) {
				await this.medioPagosRepository.update(storeId, { convenir: parsedStatus })
			}

			if (paymentGateawayMethod === StorePaymentGateawayMethods.PICKUP_AND_PAY_IN_STORE) {
				await this.medioPagosRepository.update(storeId, { tienda: parsedStatus })
			}

			if (paymentGateawayMethod === StorePaymentGateawayMethods.BANK_CONSIGNMENT) {
				await this.medioPagosRepository.update(storeId, { consignacion: parsedStatus })
			}

			if (paymentGateawayMethod === StorePaymentGateawayMethods.EFECTY) {
				await this.medioPagosRepository.update(storeId, { efecty: parsedStatus })
			}

			if (paymentGateawayMethod === StorePaymentGateawayMethods.NEQUI) {
				await this.medioPagosRepository.update(storeId, { nequi: parsedStatus })
			}

			if (paymentGateawayMethod === StorePaymentGateawayMethods.DAVIPLATA) {
				await this.medioPagosRepository.update(storeId, { daviplata: parsedStatus })
			}

			return { success: true }
		} catch (error) {
			return { success: false }
		}
	}

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

		if (paymentGateawayMethod === StorePaymentGateawayMethods.CASH_ON_DELIVERY) {
			paymentMethod = (await this.getCashOnDelivery(storeId)) as StorePaymentGateWay
		}

		if (paymentGateawayMethod === StorePaymentGateawayMethods.PAYMENT_TO_BE_AGREED) {
			paymentMethod = (await this.getPaymentToBeAgreed(storeId)) as StorePaymentGateWay
		}

		if (paymentGateawayMethod === StorePaymentGateawayMethods.PICKUP_AND_PAY_IN_STORE) {
			paymentMethod = (await this.getPickupAndPayInStore(storeId)) as StorePaymentGateWay
		}

		if (paymentGateawayMethod === StorePaymentGateawayMethods.BANK_CONSIGNMENT) {
			paymentMethod = (await this.getBankConsignment(storeId)) as StorePaymentGateWay
		}

		if (paymentGateawayMethod === StorePaymentGateawayMethods.EFECTY) {
			paymentMethod = (await this.getEfecty(storeId)) as StorePaymentGateWay
		}

		if (paymentGateawayMethod === StorePaymentGateawayMethods.NEQUI) {
			paymentMethod = (await this.getNequi(storeId)) as StorePaymentGateWay
		}

		if (paymentGateawayMethod === StorePaymentGateawayMethods.DAVIPLATA) {
			paymentMethod = (await this.getDaviplata(storeId)) as StorePaymentGateWay
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

	private async getDaviplata(storeId: number) {
		const daviplata = await this.tiendaDaviplataInfoRepository.findOne({
			where: { idTienda: storeId }
		})

		return daviplata ? daviplata : null
	}

	private async getNequi(storeId: number) {
		const nequi = await this.tiendaNequiInfoRepository.findOne({
			where: { idTienda: storeId }
		})

		return nequi ? nequi : null
	}

	private async getEfecty(storeId: number) {
		const efecty = await this.tiendaEfectyInfoRepository.findOne({
			where: { tiendaId: storeId }
		})

		return efecty ? efecty : null
	}

	private async getBankConsignment(storeId: number) {
		const bankConsignment = await this.tiendaConsignacionInfoRepository.findOne({
			where: { tiendaId: storeId }
		})

		return bankConsignment ? bankConsignment : null
	}

	private async getPickupAndPayInStore(storeId: number) {
		const pickupAndPayInStore = await this.medioPagosRepository.findOne({
			where: { idMedios: storeId }
		})

		return { connected: pickupAndPayInStore?.tienda }
	}

	private async getPaymentToBeAgreed(storeId: number) {
		const paymentToBeAgreed = await this.medioPagosRepository.findOne({
			where: { idMedios: storeId }
		})

		return { connected: paymentToBeAgreed?.convenir }
	}

	private async getCashOnDelivery(storeId: number) {
		const cashOnDelivery = await this.tiendaContraentregaInfoRepository.findOne({
			where: { idTienda: storeId }
		})

		return cashOnDelivery ? cashOnDelivery : null
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
				...mediosPagos?.idMedios2?.tiendaContraentregaInfos[0],
				estado: mediosPagos?.contraentrega
			},
			consignacion: {
				...mediosPagos?.idMedios2?.tiendaConsignacionInfos[0],
				estado: mediosPagos?.consignacion
			},
			politica_envios: mediosPagos?.idMedios2.politicas?.envios ?? null,
			politica_pagos: mediosPagos?.idMedios2.politicas?.pagos ?? null,
			nequi: { ...mediosPagos?.idMedios2?.tiendaNequiInfos[0], estado: mediosPagos?.nequi },
			daviplata: {
				...mediosPagos?.idMedios2?.tiendaDaviplataInfos[0],
				estado: mediosPagos?.daviplata
			},
			efecty: { ...mediosPagos?.idMedios2?.tiendaEfectyInfos[0], estado: mediosPagos?.efecty }
		})
	}
}
