import { Inject, Injectable } from "@nestjs/common"

import { ICityRepository } from "../../domain/repositories"
import { CommonApplicationInjectionTokens } from "../common-application-injection-token"

@Injectable()
export class GetAllCitiesQuery {
	constructor(
		@Inject(CommonApplicationInjectionTokens.ICityRepository)
		private readonly cityRepository: ICityRepository
	) {}

	async execute() {
		return await this.cityRepository.getAll()
	}
}
