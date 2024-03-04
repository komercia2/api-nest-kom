import { Inject, Injectable } from "@nestjs/common"

import { FindPaymentMethodWithCredentialsDto } from "../../domain/dtos/find-payment-method-with-credentials-dto"
import { IStorePaymentMethodsRepository } from "../../domain/repositories"
import { StorePaymentGateWay } from "../../domain/types/store-payment-gateways-type"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class CreatePaymentGatewayCommand {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStroePaymentMethodsRepository)
		private readonly paymentMethodsRepository: IStorePaymentMethodsRepository
	) {}

	async execute(
		storeId: number,
		method: FindPaymentMethodWithCredentialsDto,
		data: StorePaymentGateWay
	) {
		await this.paymentMethodsRepository.createPaymentGateway(storeId, method, data)
	}
}
