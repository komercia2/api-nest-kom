import { Inject, Injectable } from "@nestjs/common"

import { StorePaymentGateawayMethods } from "../../domain/enums/store-payment-gateaway-methods"
import { IStorePaymentMethodsRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class DeactivatePaymentGatewayCommand {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStroePaymentMethodsRepository)
		private readonly storePaymentMethodsRepository: IStorePaymentMethodsRepository
	) {}

	async execute(storeId: number, method: StorePaymentGateawayMethods) {
		return await this.storePaymentMethodsRepository.deactivate(storeId, method)
	}
}
