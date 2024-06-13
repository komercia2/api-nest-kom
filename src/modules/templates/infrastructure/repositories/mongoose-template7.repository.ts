import { Template7Entity } from "@templates/domain/entities/template7"
import { ITemplate7Repository } from "@templates/domain/repositories"

export class MongooseTemplate7Repository implements ITemplate7Repository {
	create(storeId: number): Promise<Template7Entity> {
		throw new Error("Method not implemented.")
	}
	findById(storeId: number): Promise<Template7Entity | null> {
		throw new Error("Method not implemented.")
	}
}
