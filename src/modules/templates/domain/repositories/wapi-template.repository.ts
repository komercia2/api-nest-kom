import { WapiTemplateEntity } from "../entities/wapi"

export interface IWapiTemplateRepository {
	create(storeId: number): Promise<WapiTemplateEntity>
	findById(storeId: number): Promise<WapiTemplateEntity | null>
}
