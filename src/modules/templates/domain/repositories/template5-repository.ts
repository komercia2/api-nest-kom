import { Template5Entity } from "../entities/template5"

export interface ITemplate5Repository {
	getTemplate5Settings(storeId: string): Promise<Template5Entity | null>
}
