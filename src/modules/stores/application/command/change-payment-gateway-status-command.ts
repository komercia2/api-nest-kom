import { Inject, Injectable } from "@nestjs/common"

import { ChangePaymentGatewayStatus } from "../../domain/dtos/change-payment-gateway-status.dto"
import { IStorePaymentMethodsRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class ChangePaymentGatewayStatusCommand {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStroePaymentMethodsRepository)
		private readonly storePaymentMethodsRepository: IStorePaymentMethodsRepository
	) {}

	async execute(storeId: number, method: ChangePaymentGatewayStatus) {
		return await this.storePaymentMethodsRepository.changePaymentGatewayStatus(storeId, method)
	}
}
