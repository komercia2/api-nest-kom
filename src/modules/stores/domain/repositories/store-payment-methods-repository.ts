import { StorePaymentMethodsWithoutAuthDto } from "../dtos"
import { FindPaymentMethodWithCredentialsDto } from "../dtos/find-payment-method-with-credentials-dto"
import { StorePaymentGateWay } from "../types/store-payment-gateways-type"

export interface IStorePaymentMethodsRepository {
	getWithoutAuth(storeId: number): Promise<StorePaymentMethodsWithoutAuthDto>
	getMethodWithCredentials(
		storeId: number,
		dindPaymentMethodWithCredentialsDto: FindPaymentMethodWithCredentialsDto
	): Promise<StorePaymentGateWay | null>
}
