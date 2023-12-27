import { Inject } from "@nestjs/common"

import { BankEntity } from "../../domain/entities"
import { IBankRepository } from "../../domain/repositories"
import { CommonInfrastructureInjectionTokens } from "../common-infrastructure-injection-tokens"
import { MySQLBankService } from "../services"

export class BankRepository implements IBankRepository {
	constructor(
		@Inject(CommonInfrastructureInjectionTokens.MySQLBankService)
		private readonly bankService: MySQLBankService
	) {}

	async getByCountryId(countryId: number): Promise<BankEntity[]> {
		return await this.bankService.getByCountryId(countryId)
	}
}
