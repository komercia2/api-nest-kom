import { MercadopagoIntegrationStatusEntity, MercadopagoPreferenceEntity } from "../entities"

export interface IMercadopagoRepository {
	createPreference(cartId: number): Promise<MercadopagoPreferenceEntity | null>
	getIntegrationStatus(storeId: number): Promise<MercadopagoIntegrationStatusEntity | null>
	proccessPayment(paymentId: number): Promise<void>
}
