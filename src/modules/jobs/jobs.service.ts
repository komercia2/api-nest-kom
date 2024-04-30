import { Injectable } from "@nestjs/common"
import { Cron, CronExpression } from "@nestjs/schedule"
import { InjectRepository } from "@nestjs/typeorm"
import { Logger } from "nestjs-pino"
import { Tiendas } from "src/entities"
import { Repository } from "typeorm"

import { MailsService } from "../mails/mails.service"

const TIME_ZONE = "America/Bogota"

@Injectable()
export class JobsService {
	constructor(
		@InjectRepository(Tiendas) private readonly tiendasRepository: Repository<Tiendas>,
		private readonly logger: Logger,
		private readonly mailsService: MailsService
	) {}

	@Cron(CronExpression.EVERY_DAY_AT_2PM, { timeZone: TIME_ZONE })
	async handleMembershipIsAboutToExpire() {
		this.logger.log("[handleMembershipIsAboutToExpire] Running")
		const storesToNotify = await this.findStoresAboutToExpire()

		if (storesToNotify.length === 0) {
			this.logger.warn("No stores about to expire found")
			return
		}

		this.logger.log(`Found ${storesToNotify.length} stores about to expire`)
	}

	async findStoresAboutToExpire() {
		const currentDate = new Date()
		currentDate.setDate(currentDate.getDate() + 15)

		return await this.tiendasRepository
			.createQueryBuilder("store")
			.where("store.fechaExpiracion <= :date", { date: currentDate })
			.andWhere("store.notifiedAsAboutToExpire = :sent", { sent: false })
			.innerJoin("store.tiendasInfo", "storeInfo")
			.select(["store.id", "store.nombre", "storeInfo.emailTienda", "store.fechaExpiracion"])
			.getMany()
	}

	async findStoresWithExpiredMemberships() {
		const currentDate = new Date()

		return await this.tiendasRepository
			.createQueryBuilder("store")
			.where("store.fechaExpiracion <= :date", { date: currentDate })
			.andWhere("store.notifiedAsExpired = :sent", { sent: false })
			.innerJoin("store.tiendasInfo", "storeInfo")
			.select(["store.id", "store.nombre", "storeInfo.emailTienda"])
			.getMany()
	}
}
