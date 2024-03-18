import { Inject, Injectable } from "@nestjs/common"

import { IDepartamentRepository } from "../../domain/repositories"
import { CommonApplicationInjectionTokens } from "../common-application-injection-token"

@Injectable()
export class GetDepartamentsByCountryQuery {
	constructor(
		@Inject(CommonApplicationInjectionTokens.IDepartamentRepository)
		private readonly departamentRepository: IDepartamentRepository
	) {}

	async execute(countryId: number) {
		return this.departamentRepository.getByCountry(+countryId)
	}
}
