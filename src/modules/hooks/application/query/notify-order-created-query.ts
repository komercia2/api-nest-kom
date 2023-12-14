import { Inject, Injectable } from "@nestjs/common"

import { OrderHookEntity } from "../../domain/entities"
import { IHookRepository } from "../../domain/repositories"
import { HooksApplicationInjectionTokens } from "../hooks-application-injection-tokens"

@Injectable()
export class NotifyOrderCreatedQuery {
	constructor(
		@Inject(HooksApplicationInjectionTokens.IHookRepository)
		private readonly hookRepository: IHookRepository
	) {}

	async execute(order: OrderHookEntity): Promise<void> {
		await this.hookRepository.notifyOrderCreated(order)
	}
}
