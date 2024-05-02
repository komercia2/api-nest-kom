import { Injectable } from "@nestjs/common"
import { Cron, CronExpression } from "@nestjs/schedule"
import { InjectRepository } from "@nestjs/typeorm"
import { Logger } from "nestjs-pino"
import { Tiendas } from "src/entities"
import { Repository } from "typeorm"

import { MailsService } from "../mails/mails.service"

const TIME_ZONE = "America/Bogota"
const MEMBERSHIP_IS_ABOUT_TO_EXPIRE_SENDGRID_TEMPLATE_ID = "d-497493aec9b449cc82576a448600d859"

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

		const emails = storesToNotify
			.map((store) => store?.tiendasInfo?.emailTienda)
			.filter((email) => email !== null)

		// await this.mailsService.sendMassiveEmail({
		// 	to: emails,
		// 	templateId: MEMBERSHIP_IS_ABOUT_TO_EXPIRE_SENDGRID_TEMPLATE_ID
		// })

		// await this.tiendasRepository.update(
		// 	storesToNotify.map((store) => store.id),
		// 	{ notifiedAsAboutToExpire: true }
		// )

		this.logger.log("Emails sent successfully")

		this.logger.log("[handleMembershipIsAboutToExpire] Finished")
	}

	async findStoresAboutToExpire() {
		const date15DaysBefore = this.getDateNDaysBeforeFromNow(15)
		const date10DaysLater = this.getDateNDaysLaterFromNow(10).toISOString()

		return await this.tiendasRepository
			.createQueryBuilder("store")
			.andWhere("DATE(store.createdAt) = DATE(:date15DaysAgo)", { date15DaysAgo: date15DaysBefore })
			.andWhere("store.fechaExpiracion <= DATE(:date10DaysLater)", { date10DaysLater })
			.andWhere("store.notifiedAsAboutToExpire = :sent", { sent: false })
			.innerJoin("store.tiendasInfo", "storeInfo")
			.select(["store.id", "store.nombre", "storeInfo.emailTienda", "store.fechaExpiracion"])
			.getMany()
	}

	private getDateNDaysBeforeFromNow(n: number) {
		const currentDate = new Date()
		return new Date(currentDate.setDate(currentDate.getDate() - n))
	}

	private getDateNDaysLaterFromNow(n: number) {
		const currentDate = new Date()
		return new Date(currentDate.setDate(currentDate.getDate() + n))
	}
}
