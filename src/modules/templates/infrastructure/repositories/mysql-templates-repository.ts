import { Inject } from "@nestjs/common"
import { Template5Entity } from "@templates/domain/entities/template5"
import { ITemplateRepository } from "@templates/domain/repositories"

import { InfrastructureInjectionTokens } from "../infrastructure-injection.tokens"
import { MysqlTemplate5Service } from "../services"

export class MySQLTemplateRepository implements ITemplateRepository {
	constructor(
		@Inject(InfrastructureInjectionTokens.MysqlTemplate5Service)
		private readonly mysqlTemplate5Service: MysqlTemplate5Service
	) {}
	async getTemplateSettings(template: number, storeId: string): Promise<Template5Entity | null> {
		let settings = null
		if (Number(template) === 5) {
			settings = await this.mysqlTemplate5Service.getStoreTemplate5(storeId)
		}
		return settings
	}
}
