import { Inject } from "@nestjs/common"

import { IUserAdress, UserAdressEntity } from "../../domain/entities"
import { IUserRepository } from "../../domain/repositories"
import { MysqlUserService } from "../services"
import { UsersInfrastructureInjectionTokens } from "../users-infrastructure-injection-tokens"

export class UserRepository implements IUserRepository {
	constructor(
		@Inject(UsersInfrastructureInjectionTokens.MySQLUserService)
		private readonly mysqlUserService: MysqlUserService
	) {}

	async createUserAdress(userId: number, adress: IUserAdress): Promise<void> {
		await this.mysqlUserService.createUserAdress(userId, adress)
	}

	async deleteUserAdress(userId: number, adressId: number): Promise<void> {
		await this.mysqlUserService.deleteUserAdress(userId, adressId)
	}

	async getAdressesByUserId(userId: number): Promise<UserAdressEntity[]> {
		return await this.mysqlUserService.getUserAdressesByUserId(userId)
	}
}
