import { Inject, Injectable } from "@nestjs/common"

import { IStoreDiscountRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class GetStoreDiscountsQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreDiscountRepository)
		private readonly storeDiscountRepository: IStoreDiscountRepository
	) {}

	async execute(storeId: number) {
		return await this.storeDiscountRepository.getDiscountsByStoreId(storeId)
	}
}
