import { Injectable } from "@nestjs/common"
import { Cron, CronExpression } from "@nestjs/schedule"
import { InjectRepository } from "@nestjs/typeorm"
import { Logger } from "nestjs-pino"
import { Tiendas } from "src/entities"
import { Repository } from "typeorm"

import { MailsService } from "../mails/mails.service"

@Injectable()
export class JobsService {
	constructor(
		@InjectRepository(Tiendas) private readonly tiendasRepository: Repository<Tiendas>,
		private readonly logger: Logger,
		private readonly mailsService: MailsService
	) {}

	async handleMembershipsExpired() {
		const stores = await this.findStoresWithExpiredMemberships()

		if (stores.length === 0) {
			this.logger.warn("No stores with expired memberships found")
			return
		}

		this.logger.log(`Found ${stores.length} stores with expired memberships`)
	}

	async handleMembershipIsAboutToExpire() {
		console.log("Membership is about to expire")
	}

	async findStoresWithExpiredMemberships() {
		const currentDate = new Date()

		return await this.tiendasRepository
			.createQueryBuilder("store")
			.where("store.fechaExpiracion <= :date", { date: currentDate })
			.select(["store.id"])
			.getMany()
	}
}
