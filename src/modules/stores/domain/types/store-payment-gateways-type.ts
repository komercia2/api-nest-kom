import {
	MercadopagoIntegrationStatusEntity,
	MercadopagoStoreInfoEntity
} from "src/modules/payments/domain/entities"

import {
	StoreAddiEntity,
	StoreCredibancoEntity,
	StoreEpaycoEntity,
	StoreFlowEntity,
	StorePaymentsWayEntity,
	StoreTuCompraEntity,
	StoreWePay4uEntity,
	StoreWompiEntity
} from "../entities"
import { BankConsignmmentEntity } from "../entities/payment-methods/bank-consignment-entity"
import { CashOnDelivery } from "../entities/payment-methods/cash-on-delivery-entity"
import { StoreDaviplataEntity } from "../entities/payment-methods/store-daviplata-entity"
import { EfectyStoreEntity } from "../entities/payment-methods/store-efecty-entity"
import { StoreNequiEntity } from "../entities/payment-methods/store-nequi-entity"

export type StorePaymentGateWay =
	| StoreCredibancoEntity
	| StoreEpaycoEntity
	| StorePaymentsWayEntity
	| StoreWePay4uEntity
	| StoreTuCompraEntity
	| StoreWePay4uEntity
	| (MercadopagoStoreInfoEntity & { integrationStatus: MercadopagoIntegrationStatusEntity })
	| CashOnDelivery
	| StoreWompiEntity
	| StoreFlowEntity
	| StoreAddiEntity
	| BankConsignmmentEntity
	| EfectyStoreEntity
	| StoreDaviplataEntity
	| StoreNequiEntity
	| { connected: boolean }
	| null
