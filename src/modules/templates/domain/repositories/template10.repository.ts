import { Template10Entity } from "../entities/template10"

export interface ITemplate10Repository {
	create(storeId: number): Promise<Template10Entity>
	findById(storeId: number): Promise<Template10Entity | null>
}
