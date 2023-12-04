import { Inject, Injectable } from "@nestjs/common"

import { IMercadopagoRepository } from "../../domain/repositories"
import { PaymentsApplicationInjectionToken } from "../payments-application-injection-token"

@Injectable()
export class GetIntegrationStatus {
	constructor(
		@Inject(PaymentsApplicationInjectionToken.IMercadopagoRepository)
		private readonly mercadopagoRepository: IMercadopagoRepository
	) {}

	async execute(storeId: number) {
		return this.mercadopagoRepository.getIntegrationStatus(storeId)
	}
}
