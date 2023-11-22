import { Inject } from "@nestjs/common"
import { Template5Entity } from "@templates/domain/entities/template5"
import { ITemplate5Repository } from "@templates/domain/repositories"
import { Template_5Settings } from "src/entities"

import { InfrastructureInjectionTokens } from "../infrastructure-injection.tokens"
import { MysqlTemplate5Service } from "../services"

export class MySQLTemplate5Repository implements ITemplate5Repository {
	constructor(
		@Inject(InfrastructureInjectionTokens.MysqlTemplate5Service)
		private readonly mysqlTemplate5Service: MysqlTemplate5Service
	) {}
	async getTemplate5Settings(storeId: string): Promise<Template5Entity | null> {
		const template5Settings = await this.mysqlTemplate5Service.getStoreTemplate5(storeId)
		if (!template5Settings) return null

		return this.persistenceToDomain(template5Settings)
	}

	private persistenceToDomain(template5Settings: Template_5Settings): Template5Entity {
		return new Template5Entity({
			...template5Settings
		})
	}
}
