import { Inject, Injectable } from "@nestjs/common"
import { FindPaymentMethodWithCredentialsDto } from "src/modules/stores/domain/dtos/find-payment-method-with-credentials-dto"
import { IStorePaymentMethodsRepository } from "src/modules/stores/domain/repositories"

import { StoresApplicationInjectionTokens } from "../../stores-application-injection-tokens"

@Injectable()
export class FindPaymentMethodWithCredentialsQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStroePaymentMethodsRepository)
		private readonly storePaymentMethodsRepository: IStorePaymentMethodsRepository
	) {}

	async execute(storeId: number, dto: FindPaymentMethodWithCredentialsDto) {
		return this.storePaymentMethodsRepository.getMethodWithCredentials(storeId, dto)
	}
}
