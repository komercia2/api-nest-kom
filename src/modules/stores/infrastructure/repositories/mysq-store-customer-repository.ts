import { Inject } from "@nestjs/common"

import { IStoreCustomerAccessCodeRepository } from "../../domain/repositories"
import { MySQLStoreCustomerAccessCodeService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySQLStoreCustomerAccessCodeRepository implements IStoreCustomerAccessCodeRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MySQLStoreCustomerAccessCodeService)
		private readonly storeCustomerAccessCodeService: MySQLStoreCustomerAccessCodeService
	) {}

	async checkWithoutAuth(storeId: number, accessCode: string): Promise<boolean> {
		return await this.storeCustomerAccessCodeService.checkWithoutAuth(storeId, accessCode)
	}
}
