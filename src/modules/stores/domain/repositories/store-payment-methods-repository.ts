import { StorePaymentMethodsWithoutAuthDto } from "../dtos"

export interface IStorePaymentMethodsRepository {
	getWithoutAuth(storeId: number): Promise<StorePaymentMethodsWithoutAuthDto>
}
