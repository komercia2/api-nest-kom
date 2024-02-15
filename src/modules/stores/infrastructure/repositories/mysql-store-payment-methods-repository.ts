import { Inject, Injectable } from "@nestjs/common"

import { ChangePaymentGatewayStatus } from "../../domain/dtos/change-payment-gateway-status.dto"
import { FindPaymentMethodWithCredentialsDto } from "../../domain/dtos/find-payment-method-with-credentials-dto"
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

	async changePaymentGatewayStatus(
		storeId: number,
		options: ChangePaymentGatewayStatus
	): Promise<{ success: boolean }> {
		return await this.storePaymentMethodsService.changePaymentGatewayStatus(storeId, options)
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
