import { Inject } from "@nestjs/common"

import { UserAdressEntity } from "../../domain/entities"
import { IUserRepository } from "../../domain/repositories"
import { MysqlUserService } from "../services"
import { UsersInfrastructureInjectionTokens } from "../users-infrastructure-injection-tokens"

export class UserRepository implements IUserRepository {
	constructor(
		@Inject(UsersInfrastructureInjectionTokens.MySQLUserService)
		private readonly mysqlUserService: MysqlUserService
	) {}

	async getAdressesByUserId(userId: number): Promise<UserAdressEntity[]> {
		return await this.mysqlUserService.getUserAdressesByUserId(userId)
	}
}
