import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

import { GetNotificationsDto } from "./dtos/get-notifications.dto"
import { MaskAsReadedDto } from "./dtos/mask-as-readed.dto"
import { NotificationsService } from "./notifications.service"

@ApiTags("Notifications")
@Controller()
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@Post("/notify-all-stores")
	notifyAllStores(@Body() notification: Record<string, string>) {
		// return this.notificationsService.notifyAllStores(notification)
		return { message: "For now, this endpoint is disabled for performance and security reasons" }
	}

	@Put("/mark-all-as-read/:storeId")
	markAllAsRead(@Param("storeId") storeId: number) {
		return this.notificationsService.markAllAsRead(storeId)
	}

	@Put("/mark-as-read")
	markAsRead(@Query() maskAsReadedDto: MaskAsReadedDto) {
		return this.notificationsService.markAsRead(maskAsReadedDto)
	}

	@Get("/count-pending-notifications/:storeId")
	countPendingNotifications(@Param("storeId") storeId: number) {
		return this.notificationsService.countPendingNotifications(storeId)
	}

	@Get()
	getNotifications(@Query() filters: GetNotificationsDto) {
		return this.notificationsService.getNotifications(filters)
	}
}
