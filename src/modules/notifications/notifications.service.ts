import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { PusherNotificationsService } from "@shared/infrastructure/services"
import { UuidUtil } from "@shared/infrastructure/utils"
import { Logger } from "nestjs-pino"
import { StoreNotification, Tiendas } from "src/entities"
import { DataSource, Repository } from "typeorm"

import { CreateNotificationDto } from "./dtos/create-notification.dto"
import { GetNotificationsDto } from "./dtos/get-notifications.dto"
import { MaskAsReadedDto } from "./dtos/mask-as-readed.dto"
import { Notifications } from "./enums/notifications"

@Injectable()
export class NotificationsService {
	constructor(
		@InjectRepository(StoreNotification)
		private readonly storeNotificationRepository: Repository<StoreNotification>,

		@InjectRepository(Tiendas)
		private readonly tiendasRepository: Repository<Tiendas>,

		private readonly datasource: DataSource,

		private readonly logger: Logger,

		private readonly pusherNotificationsService: PusherNotificationsService
	) {}

	async notifyAllStores(notification: Record<string, string>) {
		const queryRunner = this.datasource.createQueryRunner()
		await queryRunner.connect()
		await queryRunner.startTransaction()

		this.logger.log("Massive notification started")

		try {
			const tiendasRepository = queryRunner.manager.getRepository(Tiendas)
			const stores = await tiendasRepository.find({ select: ["id"] })

			this.logger.log(`Sending notification to ${stores.length} stores`)

			const notificationsToInsert = stores.map((store) => ({
				storeId: store.id,
				notification,
				occurredAt: new Date(),
				readed: 0,
				priority: 10
			}))

			await queryRunner.manager.insert(StoreNotification, notificationsToInsert)

			this.logger.log("Massive notification finished")

			await queryRunner.commitTransaction()

			this.logger.log("Massive notification committed")

			await this.pusherNotificationsService.trigger(
				"massive-notification",
				Notifications.FEATURE,
				notification
			)

			this.logger.log("Pusher notification sent")

			return { message: "Notifications sent" }
		} catch (error) {
			await queryRunner.rollbackTransaction()
			this.logger.error("Massive notification failed")
			throw error
		} finally {
			this.logger.log("Massive notification released")
			await queryRunner.release()
		}
	}
	async markAsRead(maskAsReadedDto: MaskAsReadedDto) {
		const { storeId, id } = maskAsReadedDto
		const notification = await this.storeNotificationRepository.findOne({
			where: { storeId, id, readed: 1 }
		})

		if (notification) throw new BadRequestException("Notification already readed")

		await this.storeNotificationRepository.update({ storeId, id }, { readed: 1 })
		return { message: "Notification marked as readed" }
	}

	async findNotification(storeId: number, id: string) {
		return this.storeNotificationRepository.findOne({ where: { storeId, id } })
	}

	async markAllAsRead(storeId: number): Promise<void> {
		await this.storeNotificationRepository.update({ storeId }, { readed: 1 })
	}

	async countPendingNotifications(storeId: number) {
		const count = await this.storeNotificationRepository.count({ where: { storeId, readed: 0 } })
		return { pendingNotifications: count }
	}

	async getNotifications(filters: GetNotificationsDto) {
		const { limit, page, storeId } = filters

		const [notifications, total] = await this.storeNotificationRepository.findAndCount({
			where: { storeId },
			order: { readed: "ASC", priority: "DESC", occurredAt: "DESC" },
			take: +limit,
			skip: +((page - 1) * limit)
		})

		return {
			notifications,
			total: Math.ceil(total / limit),
			page: +page,
			limit: +limit,
			hasNext: page < Math.ceil(total / limit),
			hasPrev: page > 1
		}
	}

	async createNotification(createNotificationDto: CreateNotificationDto): Promise<void> {
		const { storeId, notification, priority } = createNotificationDto
		const newNotification = this.storeNotificationRepository.create({
			id: UuidUtil.uuid,
			storeId,
			notification,
			priority,
			occurredAt: new Date()
		})

		await this.storeNotificationRepository.save(newNotification)
	}
}
