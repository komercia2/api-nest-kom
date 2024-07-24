import { Inject, Injectable } from "@nestjs/common"

import { UpdateIdentificationDocumentDto } from "../../domain/dtos/update-identification-document.dto"
import { IUserRepository } from "../../domain/repositories"
import { UsersApplicationInjectionTokens } from "../users-application-injection-tokens"

@Injectable()
export class UpdateIdentificationDocumentCommand {
	constructor(
		@Inject(UsersApplicationInjectionTokens.IUserRepository)
		private readonly userRepository: IUserRepository
	) {}

	async execute(data: UpdateIdentificationDocumentDto) {
		return this.userRepository.updateIdentificationDocument(data)
	}
}
