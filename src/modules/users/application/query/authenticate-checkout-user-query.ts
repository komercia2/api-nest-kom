import { Inject, Injectable } from "@nestjs/common"

import { IUserRepository } from "../../domain/repositories"
import { UsersApplicationInjectionTokens } from "../users-application-injection-tokens"

@Injectable()
export class AuthenticateCheckoutUserQuery {
	constructor(
		@Inject(UsersApplicationInjectionTokens.IUserRepository) private repository: IUserRepository
	) {}

	execute(document: string): Promise<string> {
		return this.repository.authenticateCheckoutUser(document)
	}
}
