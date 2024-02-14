import { Inject, Injectable } from "@nestjs/common"

import { FindPaymentMethodWithCredentialsDto } from "../../domain/dtos/find-payment-method-with-credentials-dto"
import { StorePaymentGateawayMethods } from "../../domain/enums/store-payment-gateaway-methods"
import { IStorePaymentMethodsRepository } from "../../domain/repositories"
import { StorePaymentGateWay } from "../../domain/types/store-payment-gateways-type"
import { MySQLStorePaymentMethodsService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

@Injectable()
export class MySQLStorePaymentMethodsRepository implements IStorePaymentMethodsRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MySQLStorePaymentMethodsService)
		private readonly storePaymentMethodsService: MySQLStorePaymentMethodsService
	) {}

	async deactivate(
		storeId: number,
		method: StorePaymentGateawayMethods
	): Promise<{ success: boolean }> {
		return await this.storePaymentMethodsService.deactivate(storeId, method)
	}

	async getMethodWithCredentials(
		storeId: number,
		dindPaymentMethodWithCredentialsDto: FindPaymentMethodWithCredentialsDto
	): Promise<StorePaymentGateWay | null> {
		return await this.storePaymentMethodsService.getMethodWithCredentials(
			storeId,
			dindPaymentMethodWithCredentialsDto
		)
	}

	async getWithoutAuth(storeId: number) {
		return this.storePaymentMethodsService.getWithoutAuth(storeId)
	}
}
