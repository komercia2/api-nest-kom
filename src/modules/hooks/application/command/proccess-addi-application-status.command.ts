import { Inject, Injectable } from "@nestjs/common"

import { AddiHookEntity } from "../../domain/entities"
import { IHookRepository } from "../../domain/repositories"
import { HooksApplicationInjectionTokens } from "../hooks-application-injection-tokens"

@Injectable()
export class ProccessAddiApplicationStatusCommand {
	constructor(
		@Inject(HooksApplicationInjectionTokens.IHookRepository)
		private readonly hookRepository: IHookRepository
	) {}

	async execute(order: AddiHookEntity) {
		await this.hookRepository.proccessAddiApplicationStatus(order)
	}
}
