import { Inject, Injectable } from "@nestjs/common"

import { IStoreWhatsAppCheckoutRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class GetStoreWhatsAppCheckoutQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreWhatsAppCheckoutRepository)
		private readonly storeWhatsAppCheckoutRepository: IStoreWhatsAppCheckoutRepository
	) {}

	async execute(storeId: number) {
		return await this.storeWhatsAppCheckoutRepository.getStoreWhatsAppCheckout(storeId)
	}
}
