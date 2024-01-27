import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UuidUtil } from "@shared/infrastructure/utils"
import { StoreNotification } from "src/entities"
import { Repository } from "typeorm"

import { CreateNotificationDto } from "./dtos/create-notification.dto"
import { GetNotificationsDto } from "./dtos/get-notifications.dto"
import { MaskAsReadedDto } from "./dtos/mask-as-readed.dto"

@Injectable()
export class NotificationsService {
	constructor(
		@InjectRepository(StoreNotification)
		private readonly storeNotificationRepository: Repository<StoreNotification>
	) {}

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
		const { storeId, notification } = createNotificationDto
		const newNotification = this.storeNotificationRepository.create({
			id: UuidUtil.uuid,
			storeId,
			notification,
			occurredAt: new Date()
		})

		await this.storeNotificationRepository.save(newNotification)
	}
}
