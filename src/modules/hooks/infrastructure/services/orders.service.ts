import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { PusherNotificationsService } from "@shared/infrastructure/services"
import { Logger } from "nestjs-pino"
import { Carritos } from "src/entities"
import { Repository } from "typeorm"

import { AddiHookEntity } from "../../domain/entities"
import { AddiApplicationStatus } from "../../domain/enums/addi-application-status"

@Injectable()
export class OrdersService {
	constructor(
		@InjectRepository(Carritos) private carritosRepository: Repository<Carritos>,
		private readonly pusherNotificationsService: PusherNotificationsService,
		private readonly logger: Logger
	) {}

	async processAddiApplicationStatus(addiOrder: AddiHookEntity) {
		const { orderId, status } = addiOrder
		try {
			const carrito = await this.carritosRepository.findOne({ where: { id: orderId } })

			if (!carrito) {
				this.logger.error(`Cart with id ${orderId} not found`)
				throw new NotFoundException(`Cart with id ${orderId} not found`)
			}

			if (carrito.estado === "1") {
				this.logger.error(`Cart with id ${orderId} is already approved`)
				throw new ConflictException(`Cart with id ${orderId} is already approved`)
			}

			if (!Object.values(AddiApplicationStatus).includes(status)) {
				this.logger.error(`Invalid status ${status}`)
				throw new ConflictException(`Invalid status ${status}`)
			}

			const normalizedStatus = this.normalizeAddiStatus(status)

			await this.carritosRepository.update(
				{ id: orderId },
				{ estado: normalizedStatus, updatedAt: new Date() }
			)

			await this.pusherNotificationsService.trigger(
				`store-${carrito.tienda}`,
				"payment-status",
				JSON.stringify({ addiOrder, normalizedStatus })
			)

			this.logger.log(`Cart with id ${orderId} updated to status ${status}`)

			return addiOrder
		} catch (error) {
			this.logger.error(`Error processing addi application status , ${error}`)
			throw error
		}
	}

	private normalizeAddiStatus(addiStatus: AddiApplicationStatus) {
		if (addiStatus === AddiApplicationStatus.PENDING) return "9"
		if (addiStatus === AddiApplicationStatus.APPROVED) return "1"
		if (addiStatus === AddiApplicationStatus.REJECTED) return "2"
		if (addiStatus === AddiApplicationStatus.ABANDONED) return "11"
		if (addiStatus === AddiApplicationStatus.DECLINED) return "2"
		if (addiStatus === AddiApplicationStatus.INTERNAL_ERROR) return "3"
		throw new ConflictException(`Invalid status ${addiStatus}`)
	}
}
