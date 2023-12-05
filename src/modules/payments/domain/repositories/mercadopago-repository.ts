import {
	MercadopagoIntegrationStatusEntity,
	MercadopagoPreferenceEntity,
	MercadopagoStoreInfoEntity
} from "../entities"

export interface IMercadopagoRepository {
	createPreference(cartId: number): Promise<MercadopagoPreferenceEntity | null>
	createIntegration(storeId: number, data: MercadopagoStoreInfoEntity): Promise<boolean>
	getIntegrationStatus(storeId: number): Promise<MercadopagoIntegrationStatusEntity | null>
	proccessPayment(paymentId: number): Promise<void>
}
