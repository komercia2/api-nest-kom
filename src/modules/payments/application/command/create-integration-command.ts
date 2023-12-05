import { Inject, Injectable } from "@nestjs/common"

import { MercadopagoStoreInfoEntity } from "../../domain/entities"
import { IMercadopagoRepository } from "../../domain/repositories"
import { PaymentsApplicationInjectionToken } from "../payments-application-injection-token"

@Injectable()
export class CreateIntegrationCommand {
	constructor(
		@Inject(PaymentsApplicationInjectionToken.IMercadopagoRepository)
		private readonly mercadopagoRepository: IMercadopagoRepository
	) {}

	async execute(storeId: number, data: MercadopagoStoreInfoEntity) {
		const integrationCreated = await this.mercadopagoRepository.createIntegration(storeId, data)
		return integrationCreated
	}
}
