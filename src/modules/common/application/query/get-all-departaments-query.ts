import { Inject, Injectable } from "@nestjs/common"

import { IDepartamentRepository } from "../../domain/repositories"
import { CommonApplicationInjectionTokens } from "../common-application-injection-token"

@Injectable()
export class GetAllDepartamentsQuery {
	constructor(
		@Inject(CommonApplicationInjectionTokens.IDepartamentRepository)
		private readonly departamentRepository: IDepartamentRepository
	) {}

	async execute() {
		return await this.departamentRepository.getAll()
	}
}
