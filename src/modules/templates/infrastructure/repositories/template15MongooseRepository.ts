import { Inject } from "@nestjs/common"
import { Template15 as Template15Entity } from "@templates/domain/entities/template15"
import { ITemplate15Repository } from "@templates/domain/repositories"

import { InfrastructureInjectionTokens } from "../infrastructure-injection.tokens"
import { Template15MongoService } from "../services"

export class Template15MongooseRepository implements ITemplate15Repository {
	constructor(
		@Inject(InfrastructureInjectionTokens.Template15MongoService)
		private readonly template15MongoService: Template15MongoService
	) {}

	async findById(storeId: number): Promise<Template15Entity | null> {
		return await this.template15MongoService.findById(storeId)
	}

	async create(storeId: number): Promise<Template15Entity> {
		const defaultTemplate15 = new Template15Entity()
		return await this.template15MongoService.create(storeId, defaultTemplate15)
	}

	async update(storeId: number, template15: Template15Entity): Promise<boolean> {
		const updated = await this.template15MongoService.update(storeId, template15)
		return updated
	}

	async remove(storeId: number): Promise<boolean> {
		return await this.template15MongoService.remove(storeId)
	}

	async find(templateId: string): Promise<Template15Entity | null> {
		return await this.template15MongoService.find(templateId)
	}
}
