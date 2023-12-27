import { Inject, Injectable } from "@nestjs/common"

import { IUserRepository } from "../../domain/repositories"
import { UsersApplicationInjectionTokens } from "../users-application-injection-tokens"

@Injectable()
export class GetAdressesByUserIdQuery {
	constructor(
		@Inject(UsersApplicationInjectionTokens.IUserRepository)
		private readonly userRepository: IUserRepository
	) {}

	async execute(userId: number) {
		return await this.userRepository.getAdressesByUserId(userId)
	}
}
