import { AddiHookEntity, OrderHookEntity } from "../entities"

export interface IHookRepository {
	notifyOrderCreated(order: OrderHookEntity): Promise<void>
	proccessAddiApplicationStatus(order: AddiHookEntity): Promise<void>
}
