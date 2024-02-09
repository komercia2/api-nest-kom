import { Inject } from "@nestjs/common"
import { PusherNotificationsService } from "@shared/infrastructure/services"
import { Logger } from "nestjs-pino"
import { NotificationsService } from "src/modules/notifications/notifications.service"

import { AddiHookEntity, OrderHookEntity } from "../../domain/entities"
import { IHookRepository } from "../../domain/repositories"
import { HooksInfrastructureInjectionTokens } from "../hooks-infrastructure-injection-tokens"
import { OrdersService } from "../services/orders.service"

export class HooksRepository implements IHookRepository {
	constructor(
		@Inject(HooksInfrastructureInjectionTokens.PusherNotificationsService)
		private readonly pusherNotificationsService: PusherNotificationsService,

		private readonly logger: Logger,

		private readonly notificationsService: NotificationsService,

		@Inject(HooksInfrastructureInjectionTokens.OrdersService)
		private readonly ordersService: OrdersService
	) {}

	async proccessAddiApplicationStatus(order: AddiHookEntity): Promise<void> {
		await this.ordersService.processAddiApplicationStatus(order)
	}

	async notifyOrderCreated(order: OrderHookEntity): Promise<void> {
		try {
			const { storeId } = order
			await this.pusherNotificationsService.trigger(`store-${storeId}`, "order-created", order)
			this.logger.log(`Store ${storeId} notified successfully`)

			await this.notificationsService.createNotification({
				notification: { event: "order-created", data: order },
				storeId: order.storeId,
				priority: 5
			})

			this.logger.log(`Notification for store ${storeId} created successfully`)
		} catch (error) {
			this.logger.error(error)
			throw error
		}
	}
}
