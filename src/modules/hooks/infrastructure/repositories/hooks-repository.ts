import { Inject } from "@nestjs/common"
import { PusherNotificationsService } from "@shared/infrastructure/services"
import { Logger } from "nestjs-pino"
import { NotificationsService } from "src/modules/notifications/notifications.service"

import { OrderHookEntity } from "../../domain/entities"
import { IHookRepository } from "../../domain/repositories"
import { HooksInfrastructureInjectionTokens } from "../hooks-infrastructure-injection-tokens"

export class HooksRepository implements IHookRepository {
	constructor(
		@Inject(HooksInfrastructureInjectionTokens.PusherNotificationsService)
		private readonly pusherNotificationsService: PusherNotificationsService,

		private readonly logger: Logger,

		private readonly notificationsService: NotificationsService
	) {}

	async notifyOrderCreated(order: OrderHookEntity): Promise<void> {
		try {
			const { storeId } = order
			await this.pusherNotificationsService.trigger(`store-${storeId}`, "order-created", order)
			this.logger.log(`Store ${storeId} notified successfully`)

			await this.notificationsService.createNotification({
				notification: { event: "order-created", data: order },
				storeId: order.storeId
			})

			this.logger.log(`Notification for store ${storeId} created successfully`)
		} catch (error) {
			this.logger.error(error)
			throw error
		}
	}
}
