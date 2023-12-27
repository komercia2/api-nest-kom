import { Inject, Injectable } from "@nestjs/common"

import { IBankRepository } from "../../domain/repositories"
import { CommonApplicationInjectionTokens } from "../common-application-injection-token"

@Injectable()
export class GetAllBanksByCountryQuery {
	constructor(
		@Inject(CommonApplicationInjectionTokens.IBankRepository)
		private readonly bankRepository: IBankRepository
	) {}

	async execute(countryId: number) {
		return await this.bankRepository.getByCountryId(countryId)
	}
}
