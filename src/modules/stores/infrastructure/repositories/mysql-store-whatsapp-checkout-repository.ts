import { Inject } from "@nestjs/common"

import { StoreWhatsappCheckoutEntity } from "../../domain/entities"
import { IStoreWhatsAppCheckoutRepository } from "../../domain/repositories"
import { MySQLStoreWhatsappCheckoutService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySQLStoreWhatsappCheckoutRepository implements IStoreWhatsAppCheckoutRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MySQLStoreWhatsAppCheckoutService)
		private readonly mySQLStoreWhatsappCheckoutService: MySQLStoreWhatsappCheckoutService
	) {}

	async getStoreWhatsAppCheckout(storeId: number): Promise<StoreWhatsappCheckoutEntity | null> {
		return await this.mySQLStoreWhatsappCheckoutService.getStoreWhatsAppCheckout(storeId)
	}
}
