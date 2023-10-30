import { Inject } from "@nestjs/common"
import { Template99Entity } from "@templates/domain/entities/template99"
import { ITemplate99Repository } from "@templates/domain/repositories"
import { TemplateWhatsappSettings } from "src/entities"

import { InfrastructureInjectionTokens } from "../infrastructure-injection.tokens"
import { MysqlTemplate99Service } from "../services"

export class MySQLTemplate99Repository implements ITemplate99Repository {
	constructor(
		@Inject(InfrastructureInjectionTokens.MysqlTemplate99Service)
		private readonly mysqlTemplate99Service: MysqlTemplate99Service
	) {}
	async getTemplate99Settings(storeId: string): Promise<Template99Entity | null> {
		const template99Settings = await this.mysqlTemplate99Service.getStoreTemplate99(storeId)

		if (!template99Settings) return null

		return this.persistenceToDomain(template99Settings)
	}

	private persistenceToDomain(template99Settings: TemplateWhatsappSettings): Template99Entity {
		return new Template99Entity({
			...template99Settings
		})
	}
}
