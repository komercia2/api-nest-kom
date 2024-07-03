import { Inject, Injectable } from "@nestjs/common"

import { CreateCheckoutUserDto } from "../../domain/dtos/create-checkout-user.dto"
import { IUserRepository } from "../../domain/repositories"
import { UsersApplicationInjectionTokens } from "../users-application-injection-tokens"

@Injectable()
export class CreateCheckoutUserCommand {
	constructor(
		@Inject(UsersApplicationInjectionTokens.IUserRepository)
		private readonly userRepository: IUserRepository
	) {}

	async execute(createCheckoutUserDto: CreateCheckoutUserDto) {
		return this.userRepository.createCheckoutUser(createCheckoutUserDto)
	}
}
