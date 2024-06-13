import { Template9Entity } from "../entities/template9"

export interface ITemplate9Repository {
	create(storeId: number): Promise<Template9Entity>
	findById(storeId: number): Promise<Template9Entity | null>
}
