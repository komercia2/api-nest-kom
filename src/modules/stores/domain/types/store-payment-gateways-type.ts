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

export type StorePaymentGateWay =
	| StoreCredibancoEntity
	| StoreEpaycoEntity
	| StorePaymentsWayEntity
	| StoreWePay4uEntity
	| StoreTuCompraEntity
	| StoreWePay4uEntity
	| (MercadopagoStoreInfoEntity & { integrationStatus: MercadopagoIntegrationStatusEntity })
	| StoreWompiEntity
	| StoreFlowEntity
	| StoreAddiEntity
	| null
