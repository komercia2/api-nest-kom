import { OrderHookEntity } from "../entities"

export interface IHookRepository {
	notifyOrderCreated(order: OrderHookEntity): Promise<void>
}
