import { Template7Entity } from "../entities/template7"

export interface ITemplate7Repository {
	create(storeId: number): Promise<Template7Entity>
	findById(storeId: number): Promise<Template7Entity | null>
}
