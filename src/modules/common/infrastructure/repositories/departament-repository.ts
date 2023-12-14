import { Inject } from "@nestjs/common"

import { DepartamentEntity } from "../../domain/entities"
import { IDepartamentRepository } from "../../domain/repositories"
import { CommonInfrastructureInjectionTokens } from "../common-infrastructure-injection-tokens"
import { MySQLDepartamentService } from "../services"

export class DepartamentRepository implements IDepartamentRepository {
	constructor(
		@Inject(CommonInfrastructureInjectionTokens.MySQLDepartamentService)
		private readonly mysqlDepartamentService: MySQLDepartamentService
	) {}

	async getAll(): Promise<DepartamentEntity[]> {
		return await this.mysqlDepartamentService.getAll()
	}
}
