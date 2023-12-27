import { Inject, Injectable } from "@nestjs/common"

import { IUserAdress, UserAdressEntity } from "../../domain/entities"
import { IUserRepository } from "../../domain/repositories"
import { UsersApplicationInjectionTokens } from "../users-application-injection-tokens"

@Injectable()
export class CreateUserAdressCommand {
	constructor(
		@Inject(UsersApplicationInjectionTokens.IUserRepository)
		private readonly userRepository: IUserRepository
	) {}

	async execute(userId: number, adress: IUserAdress) {
		const userAdress = new UserAdressEntity(adress)
		await this.userRepository.createUserAdress(userId, userAdress)
	}
}
