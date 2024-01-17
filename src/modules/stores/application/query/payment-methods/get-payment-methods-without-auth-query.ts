import { Inject, Injectable } from "@nestjs/common"
import { IStorePaymentMethodsRepository } from "src/modules/stores/domain/repositories"

import { StoresApplicationInjectionTokens } from "../../stores-application-injection-tokens"

@Injectable()
export class GetPaymentMethodsWithoutAuthQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStroePaymentMethodsRepository)
		private readonly storePaymentMethodsRepository: IStorePaymentMethodsRepository
	) {}

	async execute(storeId: number) {
		return await this.storePaymentMethodsRepository.getWithoutAuth(storeId)
	}
}
