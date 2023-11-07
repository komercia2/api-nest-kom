import { Inject, Injectable } from "@nestjs/common"

import { IStorePoliciesRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class GetStorePoliciesQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStorePoliciesRepository)
		private readonly storePoliciesRepository: IStorePoliciesRepository
	) {}

	async execute(idTienda: number) {
		return this.storePoliciesRepository.getStorePolicies(idTienda)
	}
}
