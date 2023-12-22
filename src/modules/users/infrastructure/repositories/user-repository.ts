import { Inject, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"

import { IUserAdress, UserAdressEntity } from "../../domain/entities"
import { IUserRepository } from "../../domain/repositories"
import { MysqlUserService } from "../services"
import { UsersInfrastructureInjectionTokens } from "../users-infrastructure-injection-tokens"

export class UserRepository implements IUserRepository {
	constructor(
		@Inject(UsersInfrastructureInjectionTokens.MySQLUserService)
		private readonly mysqlUserService: MysqlUserService,

		private readonly jwtService: JwtService,

		private readonly configService: ConfigService
	) {}

	async authenticateCheckoutUser(userId: number, document: string): Promise<string> {
		const user = await this.mysqlUserService.searchUserByDocumentAndId(userId, document)

		if (!user) throw new UnauthorizedException(`User identified with ${document} not found`)

		return this.jwtService.sign(
			{ userId: user.id },
			{ expiresIn: "1h", privateKey: this.configService.get<string>("JWT_SECRET") }
		)
	}

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
