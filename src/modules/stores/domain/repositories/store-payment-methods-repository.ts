import { StorePaymentMethodsWithoutAuthDto } from "../dtos"
import { FindPaymentMethodWithCredentialsDto } from "../dtos/find-payment-method-with-credentials-dto"
import { StorePaymentGateawayMethods } from "../enums/store-payment-gateaway-methods"
import { StorePaymentGateWay } from "../types/store-payment-gateways-type"

export interface IStorePaymentMethodsRepository {
	getWithoutAuth(storeId: number): Promise<StorePaymentMethodsWithoutAuthDto>
	getMethodWithCredentials(
		storeId: number,
		dindPaymentMethodWithCredentialsDto: FindPaymentMethodWithCredentialsDto
	): Promise<StorePaymentGateWay | null>
	deactivate(storeId: number, method: StorePaymentGateawayMethods): Promise<{ success: boolean }>
}
