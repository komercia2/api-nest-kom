import { Template12Entity } from "../entities/template12"

export interface ITemplate12Repository {
	create(storeId: number): Promise<Template12Entity>
	findById(storeId: number): Promise<Template12Entity | null>
}
