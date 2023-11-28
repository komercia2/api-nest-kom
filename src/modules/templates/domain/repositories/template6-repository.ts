import { Template6Entity } from "../entities/template6/template6"

export interface ITemplate6Repository {
	create(storeId: number): Promise<Template6Entity>
	findById(storeId: number): Promise<Template6Entity | null>
}
