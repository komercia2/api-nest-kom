import { Inject } from "@nestjs/common"
import { ITemplateRepository, TemplateSetting } from "@templates/domain/repositories"

import { InfrastructureInjectionTokens } from "../infrastructure-injection.tokens"
import { MySQLTemplate5Repository } from "./mysql-template5-repository"
import { MySQLTemplate99Repository } from "./mysql-template99-repository"

export class MySQLTemplateRepository implements ITemplateRepository {
	constructor(
		@Inject(InfrastructureInjectionTokens.MySqlTemplate5Repository)
		private readonly mysqlTemplate5Repository: MySQLTemplate5Repository,

		@Inject(InfrastructureInjectionTokens.MySqlTemplate99Repository)
		private readonly mysqlTemplate99Service: MySQLTemplate99Repository
	) {}
	async getTemplateSettings(template: number, storeId: string): Promise<TemplateSetting | null> {
		let settings = null

		if (Number(template) === 5) {
			settings = await this.mysqlTemplate5Repository.getTemplate5Settings(storeId)
		}

		if (Number(template) === 99) {
			settings = await this.mysqlTemplate99Service.getTemplate99Settings(storeId)
		}

		return settings
	}
}
