import { Inject, Injectable } from "@nestjs/common"

import { WompiEntity } from "../../domain/entities"
import { IHookRepository } from "../../domain/repositories"
import { HooksApplicationInjectionTokens } from "../hooks-application-injection-tokens"

@Injectable()
export class ProccessWompiPaymentStatusCommand {
	constructor(
		@Inject(HooksApplicationInjectionTokens.IHookRepository)
		private readonly hookRepository: IHookRepository
	) {}

	async execute(event: WompiEntity): Promise<void> {
		return this.hookRepository.processWompiPaymentStatus(event)
	}
}
