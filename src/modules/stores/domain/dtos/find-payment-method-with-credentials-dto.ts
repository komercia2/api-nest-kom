import { IsEnum, IsIn } from "class-validator"

import { StorePaymentGateawayMethods } from "../enums/store-payment-gateaway-methods"

export class FindPaymentMethodWithCredentialsDto {
	@IsIn([
		"EPAYCO",
		"PAYU",
		"CREDIBANCO",
		"WOMPI",
		"PAYMENTS_WAY",
		"WEPAY4U",
		"TU_COMPRA",
		"FLOW",
		"MERCADOPAGO",
		"ADDI"
	])
	public readonly paymentGateawayMethod: StorePaymentGateawayMethods
}
