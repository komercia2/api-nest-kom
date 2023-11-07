import { MercadopagoPreferenceEntity } from "../entities"

export interface IMercadopagoRepository {
	createPreference(cartId: number): Promise<MercadopagoPreferenceEntity>
}
