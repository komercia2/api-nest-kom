import { Inject, Injectable } from "@nestjs/common"

import { IMercadopagoRepository } from "../../domain/repositories"
import { PaymentsApplicationInjectionToken } from "../payments-application-injection-token"

@Injectable()
export class CreateMercadopagoPreferenceQuery {
	constructor(
		@Inject(PaymentsApplicationInjectionToken.IMercadopagoRepository)
		private readonly mercadopagoRepository: IMercadopagoRepository
	) {}

	async execute(cartId: number) {
		return await this.mercadopagoRepository.createPreference(cartId)
	}
}
