import { Inject } from "@nestjs/common"
import { Template6Entity } from "@templates/domain/entities/template6/template6"
import { ITemplate6Repository } from "@templates/domain/repositories"

import { InfrastructureInjectionTokens } from "../infrastructure-injection.tokens"
import { MongooseTemplate6Service } from "../services"

export class MongooseTemplate6Repository implements ITemplate6Repository {
	constructor(
		@Inject(InfrastructureInjectionTokens.MongooseTemplate6Service)
		private readonly template6Service: MongooseTemplate6Service
	) {}

	async create(storeId: number): Promise<Template6Entity> {
		throw new Error("Method not implemented.")
		// return await this.template6Service.create2(storeId)
	}
	async findById(storeId: number): Promise<Template6Entity | null> {
		throw new Error("Method not implemented.")
	}
}
