import { Template99Entity } from "../entities/template99"

export interface ITemplate99Repository {
	getTemplate5Settings(storeId: string): Promise<Template99Entity | null>
}
