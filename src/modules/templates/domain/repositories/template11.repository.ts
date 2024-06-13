import { Template11Entity } from "../entities/template11"

export interface ITemplate11Repository {
	create(storeId: number): Promise<Template11Entity>
	findById(storeId: number): Promise<Template11Entity | null>
}
