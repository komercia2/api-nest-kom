import { Inject, Injectable } from "@nestjs/common"

import { EncryptWompiIntegrityDto } from "../../domain/dtos"
import { IStorePaymentMethodsRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class EncryptWompiIntegrityQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStroePaymentMethodsRepository)
		private readonly storePaymentMethodsRepository: IStorePaymentMethodsRepository
	) {}

	async execute(data: EncryptWompiIntegrityDto) {
		return await this.storePaymentMethodsRepository.encryptWompiIntegrity(data)
	}
}
