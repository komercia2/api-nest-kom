import { Inject, Injectable } from "@nestjs/common"

import { IStorePaymentMethodsRepository } from "../../domain/repositories"
import { MySQLStorePaymentMethodsService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

@Injectable()
export class MySQLStorePaymentMethodsRepository implements IStorePaymentMethodsRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MySQLStorePaymentMethodsService)
		private readonly storePaymentMethodsService: MySQLStorePaymentMethodsService
	) {}

	async getWithoutAuth(storeId: number) {
		return this.storePaymentMethodsService.getWithoutAuth(storeId)
	}
}
