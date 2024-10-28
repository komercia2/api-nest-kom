import { Template13Entity } from "../entities/template13"

export interface ITemplate13Repository {
	create(storeId: number): Promise<Template13Entity>
	findById(storeId: number): Promise<Template13Entity | null>
}
