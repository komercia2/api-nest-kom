import { AddiHookEntity, OrderHookEntity, WompiEntity } from "../entities"

export interface IHookRepository {
	notifyOrderCreated(order: OrderHookEntity): Promise<void>
	proccessAddiApplicationStatus(order: AddiHookEntity): Promise<AddiHookEntity>
	processWompiPaymentStatus(order: WompiEntity): Promise<void>
}
