import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { PusherNotificationsService } from "@shared/infrastructure/services"
import { createHash } from "crypto"
import { Logger } from "nestjs-pino"
import { Carritos, TiendaWompiInfo } from "src/entities"
import { Repository } from "typeorm"

import { AddiHookEntity, WompiEntity } from "../../domain/entities"
import { AddiApplicationStatus } from "../../domain/enums/addi-application-status"

@Injectable()
export class OrdersService {
	constructor(
		@InjectRepository(Carritos) private carritosRepository: Repository<Carritos>,
		@InjectRepository(TiendaWompiInfo)
		private tiendaWompiInfoRepository: Repository<TiendaWompiInfo>,
		private readonly pusherNotificationsService: PusherNotificationsService,
		private readonly logger: Logger
	) {}

	async processWompiPaymentStatus(order: WompiEntity) {
		const { status, reference } = order.data.transaction

		this.logger.log(`Processing Wompi payment status for order ${reference} with status ${status}`)

		const cart = await this.carritosRepository.findOne({ where: { id: +reference } })

		if (!cart) {
			this.logger.error(`Cart with id ${reference} not found`)
			throw new NotFoundException(`Cart with id ${reference} not found`)
		}

		const wompiCredentials = await this.tiendaWompiInfoRepository.findOne({
			where: { idTienda: cart.tienda }
		})

		if (!wompiCredentials?.eventSecret) {
			this.logger.error(`Wompi credentials not found for order ${reference}`)
			throw new NotFoundException(`Wompi credentials not found for order ${reference}`)
		}

		const { eventSecret } = wompiCredentials

		const signature = this.generateWompiSignature(order, eventSecret)

		const checksum = createHash("sha256").update(signature).digest("hex")

		if (checksum !== order.signature.checksum) {
			this.logger.error(`Invalid signature for order ${reference}`)
			throw new ConflictException(`Invalid signature for order ${reference}`)
		}

		if (status === "APPROVED") {
			await this.carritosRepository.update(
				{ id: +reference },
				{ estado: "1", updatedAt: new Date() }
			)
		}

		if (status === "DECLINED") {
			await this.carritosRepository.update(
				{ id: +reference },
				{ estado: "2", updatedAt: new Date() }
			)
		}

		if (status === "ERROR") {
			await this.carritosRepository.update(
				{ id: +reference },
				{ estado: "3", updatedAt: new Date() }
			)
		}

		if (status === "VOIDED") {
			await this.carritosRepository.update(
				{ id: +reference },
				{ estado: "11", updatedAt: new Date() }
			)
		}

		const normalizedStatus = this.normalizeWompiStatus(status)

		await this.pusherNotificationsService.trigger(
			`store-${cart.tienda}`,
			"payment-status",
			JSON.stringify({ addiOrder: +reference, normalizedStatus })
		)
	}

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

	private generateWompiSignature(order: WompiEntity, eventSecret: string) {
		const { id, status, amount_in_cents } = order.data.transaction
		const { timestamp } = order

		return `${id}${status}${amount_in_cents}${timestamp}${eventSecret}`
	}

	private normalizeWompiStatus(status: string) {
		if (status === "APPROVED") return "1"
		if (status === "DECLINED") return "2"
		if (status === "ERROR") return "3"
		if (status === "VOIDED") return "11"
		throw new ConflictException(`Invalid status ${status}`)
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
