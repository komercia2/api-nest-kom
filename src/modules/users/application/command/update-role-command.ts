import { Inject, Injectable } from "@nestjs/common"

import { IUserRepository } from "../../domain/repositories"
import { UsersApplicationInjectionTokens } from "../users-application-injection-tokens"

@Injectable()
export class UpdateRoleCommand {
	constructor(
		@Inject(UsersApplicationInjectionTokens.IUserRepository)
		private readonly userRepository: IUserRepository
	) {}

	async execute(userId: string, role: number): Promise<void> {
		await this.userRepository.updateRole(userId, role)
	}
}
