import { Inject, Injectable } from "@nestjs/common"

import { IUserRepository } from "../../domain/repositories"
import { UsersApplicationInjectionTokens } from "../users-application-injection-tokens"

@Injectable()
export class DeleteUserAdressCommand {
	constructor(
		@Inject(UsersApplicationInjectionTokens.IUserRepository)
		private readonly userRepository: IUserRepository
	) {}

	async execute(userId: number, adressId: number): Promise<void> {
		await this.userRepository.deleteUserAdress(userId, adressId)
	}
}
