import { Inject } from "@nestjs/common"

import { IUserRepository } from "../../domain/repositories"
import { MySQLUserService } from "../services"
import { UsersInfrastructureInjectionTokens } from "../users-infrastructure-injection-tokens"

export class MySQLUserRepository implements IUserRepository {
	constructor(
		@Inject(UsersInfrastructureInjectionTokens.MySQLUserService)
		private readonly mysqlUserService: MySQLUserService
	) {}

	async updateRole(userId: string, role: number): Promise<void> {
		await this.mysqlUserService.updateRole(userId, role)
	}
}
