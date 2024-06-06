import { WapiTemplateEntity } from "@templates/domain/entities/wapi"
import { IWapiTemplateRepository } from "@templates/domain/repositories"

export class MongooseWapiRepository implements IWapiTemplateRepository {
	create(storeId: number): Promise<WapiTemplateEntity> {
		throw new Error("Method not implemented.")
	}
	findById(storeId: number): Promise<WapiTemplateEntity | null> {
		throw new Error("Method not implemented.")
	}
}
