import { CACHE_MANAGER } from "@nestjs/cache-manager"
import { Inject } from "@nestjs/common"
import { Cache } from "cache-manager"

import { DepartamentEntity } from "../../domain/entities"
import { IDepartamentRepository } from "../../domain/repositories"
import { CommonInfrastructureInjectionTokens } from "../common-infrastructure-injection-tokens"
import { MySQLDepartamentService } from "../services"

export class DepartamentRepository implements IDepartamentRepository {
	constructor(
		@Inject(CommonInfrastructureInjectionTokens.MySQLDepartamentService)
		private readonly mysqlDepartamentService: MySQLDepartamentService,

		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache
	) {}

	async getAll(): Promise<DepartamentEntity[]> {
		const departaments = await this.cacheManager.get<DepartamentEntity[]>("departaments")
		if (departaments) return departaments

		const departamentsFromDatabase = await this.mysqlDepartamentService.getAll()
		await this.cacheManager.set("departaments", departamentsFromDatabase, 60 * 60)

		return departamentsFromDatabase
	}
}
