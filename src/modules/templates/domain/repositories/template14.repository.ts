import { Template14Entity } from "../entities/template14"

export interface ITemplate14Repository {
	create(storeId: number): Promise<Template14Entity>
	findById(storeId: number): Promise<Template14Entity | null>
}
