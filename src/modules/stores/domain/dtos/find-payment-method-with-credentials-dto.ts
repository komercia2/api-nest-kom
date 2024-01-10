import { IsEnum } from "class-validator"

import { StorePaymentGateawayMethods } from "../enums/store-payment-gateaway-methods"

export class FindPaymentMethodWithCredentialsDto {
	@IsEnum(StorePaymentGateawayMethods)
	public readonly paymentGateawayMethod: StorePaymentGateawayMethods
}
