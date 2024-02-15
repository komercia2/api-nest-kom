import { StorePaymentMethodsWithoutAuthDto } from "../dtos"
import { ChangePaymentGatewayStatus } from "../dtos/change-payment-gateway-status.dto"
import { FindPaymentMethodWithCredentialsDto } from "../dtos/find-payment-method-with-credentials-dto"
import { StorePaymentGateWay } from "../types/store-payment-gateways-type"

export interface IStorePaymentMethodsRepository {
	getWithoutAuth(storeId: number): Promise<StorePaymentMethodsWithoutAuthDto>
	getMethodWithCredentials(
		storeId: number,
		dindPaymentMethodWithCredentialsDto: FindPaymentMethodWithCredentialsDto
	): Promise<StorePaymentGateWay | null>
	changePaymentGatewayStatus(
		storeId: number,
		options: ChangePaymentGatewayStatus
	): Promise<{ success: boolean }>
	updatePaymentGateway(
		storeId: number,
		method: FindPaymentMethodWithCredentialsDto,
		data: StorePaymentGateWay
	): Promise<void>
}
