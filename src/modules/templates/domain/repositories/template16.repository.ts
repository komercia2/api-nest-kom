import { Template16Entity } from "../entities/template16"

export interface ITemplate16Repository {
	create(storeId: number): Promise<Template16Entity>
	findById(storeId: number): Promise<Template16Entity | null>
}
