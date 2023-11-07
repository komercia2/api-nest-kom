import { StoreWhatsappCheckoutEntity } from "../entities"

export interface IStoreWhatsAppCheckoutRepository {
	getStoreWhatsAppCheckout(storeId: number): Promise<StoreWhatsappCheckoutEntity | null>
}
