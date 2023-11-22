import { Inject, Injectable } from "@nestjs/common"

import { IMercadopagoRepository } from "../../domain/repositories"
import { PaymentsApplicationInjectionToken } from "../payments-application-injection-token"

@Injectable()
export class ProccessPaymentCommand {
	constructor(
		@Inject(PaymentsApplicationInjectionToken.IMercadopagoRepository)
		private readonly mercadopagoRepository: IMercadopagoRepository
	) {}

	async execute(paymentId: number): Promise<void> {
		await this.mercadopagoRepository.proccessPayment(paymentId)
	}
}
