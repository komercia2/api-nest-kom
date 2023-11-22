import { Inject, Injectable } from "@nestjs/common"

import { IStoreCustomerAccessCodeRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class CheckWithoutAuthQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreCustomerAccessCodeRepository)
		private storeAccessCodeRepository: IStoreCustomerAccessCodeRepository
	) {}

	async execute(storeId: number, accessCode: string): Promise<boolean> {
		return await this.storeAccessCodeRepository.checkWithoutAuth(storeId, accessCode)
	}
}
