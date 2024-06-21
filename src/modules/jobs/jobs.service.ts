import { Injectable } from "@nestjs/common"
import { Cron, CronExpression } from "@nestjs/schedule"
import { InjectRepository } from "@nestjs/typeorm"
import { Logger } from "nestjs-pino"
import { Tiendas } from "src/entities"
import { Repository } from "typeorm"

import { MailsService } from "../mails/mails.service"

const MEMBERSHIP_IS_ABOUT_TO_EXPIRE_SENDGRID_TEMPLATE_ID = "d-497493aec9b449cc82576a448600d859"
const MEMBERSHIP_EXPIRED_SENDGRID_TEMPLATE_ID = "d-850e71d007ca45c391f9da41afd605cb"
const MEMBERSHIP_EXPIRED_DISCOUNT_SENDGRID_TEMPLATE_ID = "d-843ed8e8a41d482a81cad55c1781beed"

@Injectable()
export class JobsService {
	constructor(
		@InjectRepository(Tiendas) private readonly tiendasRepository: Repository<Tiendas>,
		private readonly logger: Logger,
		private readonly mailsService: MailsService
	) {}

	@Cron(CronExpression.EVERY_DAY_AT_5PM)
	async handleMembershipDiscount() {
		this.logger.log("[handleMembershipDiscount] Running")
		const storesToNotify = await this.handleMembershipExpiredDiscount()

		if (storesToNotify.length === 0) {
			this.logger.warn("No stores with discount found")
			return
		}

		this.logger.log(`Found ${storesToNotify.length} stores with discount`)

		const filteredMails = storesToNotify
			.map((store) => store?.tiendasInfo?.emailTienda)
			.filter((email) => email !== null)

		await this.mailsService.sendMassiveEmail({
			to: filteredMails as string[],
			templateId: MEMBERSHIP_EXPIRED_DISCOUNT_SENDGRID_TEMPLATE_ID
		})

		await this.tiendasRepository.update(
			storesToNotify.map(({ id }) => id),
			{ notifiedAsDiscount: true }
		)
	}

	@Cron(CronExpression.EVERY_DAY_AT_6PM)
	async handleMembershipExpired() {
		this.logger.log("[handleMembershipExpired] Running")
		const storesExpired = await this.findStoresExpired()

		if (storesExpired.length === 0) {
			this.logger.warn("No stores expired found")
			return
		}

		this.logger.log(`Found ${storesExpired.length} stores expired`)

		this.logger.log(`Stores IDs: ${storesExpired.map(({ id }) => id).join(", ")}`)
		const filteredMails = storesExpired
			.map((store) => store?.tiendasInfo?.emailTienda)
			.filter((email) => email !== null)

		await this.mailsService.sendMassiveEmail({
			to: filteredMails as string[],
			templateId: MEMBERSHIP_EXPIRED_SENDGRID_TEMPLATE_ID
		})

		await this.tiendasRepository.update(
			storesExpired.map(({ id }) => id),
			{ notifiedAsExpired: true }
		)

		this.logger.log("Emails sent successfully")

		this.logger.log("[handleMembershipExpired] Finished")
	}

	@Cron(CronExpression.EVERY_DAY_AT_7PM)
	async handleMembershipIsAboutToExpire() {
		this.logger.log("[handleMembershipIsAboutToExpire] Running")
		const storesToNotify = await this.findStoresAboutToExpire()

		if (storesToNotify.length === 0) {
			this.logger.warn("No stores about to expire found")
			return
		}

		this.logger.log(`Found ${storesToNotify.length} stores about to expire`)

		const filteredMails = storesToNotify
			.map((store) => store?.tiendasInfo?.emailTienda)
			.filter((email) => email !== null)

		await this.mailsService.sendMassiveEmail({
			to: filteredMails as string[],
			templateId: MEMBERSHIP_IS_ABOUT_TO_EXPIRE_SENDGRID_TEMPLATE_ID
		})

		await this.tiendasRepository.update(
			storesToNotify.map(({ id }) => id),
			{ notifiedAsAboutToExpire: true }
		)

		this.logger.log("Emails sent successfully")

		this.logger.log("[handleMembershipIsAboutToExpire] Finished")
	}

	async handleMembershipExpiredDiscount() {
		const date40DaysBefore = this.getDateNDaysBeforeFromNow(40)
		const currentDate = new Date().toISOString()

		return await this.tiendasRepository
			.createQueryBuilder("store")
			.andWhere("DATE(store.createdAt) = DATE(:date40DaysBefore)", { date40DaysBefore })
			.andWhere("store.fechaExpiracion <= DATE(:currentDate)", { currentDate })
			.innerJoin("store.tiendasInfo", "storeInfo")
			.select(["store.id", "store.nombre", "storeInfo.emailTienda", "store.fechaExpiracion"])
			.getMany()
	}

	async findStoresExpired() {
		const date30DaysBefore = this.getDateNDaysBeforeFromNow(30)
		const currentDate = new Date().toISOString()

		return await this.tiendasRepository
			.createQueryBuilder("store")
			.andWhere("DATE(store.createdAt) = DATE(:date30DaysBefore)", { date30DaysBefore })
			.andWhere("store.fechaExpiracion <= DATE(:currentDate)", { currentDate })
			.innerJoin("store.tiendasInfo", "storeInfo")
			.select(["store.id", "store.nombre", "storeInfo.emailTienda", "store.fechaExpiracion"])
			.getMany()
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
