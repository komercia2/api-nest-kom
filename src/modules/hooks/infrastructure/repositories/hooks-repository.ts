import { Inject } from "@nestjs/common"
import { PusherNotificationsService } from "@shared/infrastructure/services"
import { Logger } from "nestjs-pino"

import { OrderHookEntity } from "../../domain/entities"
import { IHookRepository } from "../../domain/repositories"
import { HooksInfrastructureInjectionTokens } from "../hooks-infrastructure-injection-tokens"

export class HooksRepository implements IHookRepository {
	constructor(
		@Inject(HooksInfrastructureInjectionTokens.PusherNotificationsService)
		private readonly pusherNotificationsService: PusherNotificationsService,

		private readonly logger: Logger
	) {}

	async notifyOrderCreated(order: OrderHookEntity): Promise<void> {
		try {
			const { storeId } = order
			await this.pusherNotificationsService.trigger(`store-${storeId}`, "order-created", order)
			this.logger.log(`Store ${storeId} notified successfully`)
		} catch (error) {
			this.logger.error(error)
			throw error
		}
	}
}
