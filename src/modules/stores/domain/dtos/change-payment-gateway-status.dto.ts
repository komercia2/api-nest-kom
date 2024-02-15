import { IsEnum } from "class-validator"

import { ChangePaymentGatewayStatusOptions } from "../enums/change-payment-gateway-status"
import { StorePaymentGateawayMethods } from "../enums/store-payment-gateaway-methods"

export class ChangePaymentGatewayStatus {
	@IsEnum(StorePaymentGateawayMethods)
	readonly paymentGateawayMethod: StorePaymentGateawayMethods

	@IsEnum(ChangePaymentGatewayStatusOptions)
	readonly operation: ChangePaymentGatewayStatusOptions
}
