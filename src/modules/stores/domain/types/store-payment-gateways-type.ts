import {
	StoreCredibancoEntity,
	StoreEpaycoEntity,
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
	| StoreWompiEntity
	| null
