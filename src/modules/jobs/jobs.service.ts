import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Cron, CronExpression } from "@nestjs/schedule"
import { InjectRepository } from "@nestjs/typeorm"
import { Logger } from "nestjs-pino"
import OpenAI from "openai"
import { MensajesContacto, Tiendas } from "src/entities"
import { IsNull, Like, Repository } from "typeorm"

import { ClodinaryService } from "../clodinary/clodinary.service"
import { MailsService } from "../mails/mails.service"

const MEMBERSHIP_IS_ABOUT_TO_EXPIRE_SENDGRID_TEMPLATE_ID = "d-497493aec9b449cc82576a448600d859"
const MEMBERSHIP_EXPIRED_SENDGRID_TEMPLATE_ID = "d-850e71d007ca45c391f9da41afd605cb"
const MEMBERSHIP_EXPIRED_DISCOUNT_SENDGRID_TEMPLATE_ID = "d-843ed8e8a41d482a81cad55c1781beed"
const MEMBERSHIP_EXPIRED_60_DAYS_SENDGRID_TEMPLATE_ID = "d-dd396b058ecb4821822898edc95b0c60"

@Injectable()
export class JobsService {
	constructor(
		@InjectRepository(Tiendas) private readonly tiendasRepository: Repository<Tiendas>,
		private readonly logger: Logger,
		private readonly mailsService: MailsService,
		private readonly cloudinaryService: ClodinaryService,
		@InjectRepository(MensajesContacto)
		private readonly mensajesContactoRepository: Repository<MensajesContacto>,
		private readonly configService: ConfigService
	) {}

	private openAI = new OpenAI({
		apiKey: this.configService.get("OPENAI_API_KEY") as string
	})

	// @Cron(CronExpression.EVERY_MINUTE)
	// async handleMigrateLogo() {
	// 	this.logger.log("[handleMigrateLogo] Running")

	// 	const stores = await this.findStoresWithoutExpire()

	// 	if (stores.length === 0) {
	// 		this.logger.warn("No stores found")
	// 		return
	// 	}

	// 	this.logger.log(`Found ${stores.length} stores`)

	// 	const promises = stores.map(async (store) => {
	// 		try {
	// 			await this.cloudinaryService.syncStoreLogo(store.id)
	// 		} catch (error) {
	// 			this.logger.error(`Failed to migrate logo for store with ID ${store.id}: ${error}`)
	// 		}
	// 	})

	// 	await Promise.all(promises)

	// 	this.logger.log("[handleMigrateLogo] Finished")
	// }

	@Cron(CronExpression.EVERY_MINUTE)
	async handleEvalConatctMessageRisk() {
		this.logger.log("[handleEvalConatctMessageRisk] Running")

		const riskContactMessages = await this.mensajesContactoRepository.find({
			where: [
				{ mensaje: Like("%http%") },
				{ mensaje: Like("%https%") },
				{ mensaje: Like("%www%") },
				{ mensaje: Like("%@%") },
				{ posibleFraude: IsNull() }
			],
			take: 10,
			order: { createdAt: "ASC" }
		})

		if (riskContactMessages.length === 0) {
			this.logger.warn("No contact messages with risk found")
			return
		}
		this.logger.log(`Processing ${riskContactMessages.length} potentially risky messages`)

		const promises = riskContactMessages.map(async (message) => {
			const { mensaje, id } = message

			try {
				const evaluation = await this.openAI.chat.completions.create({
					model: "gpt-4o-mini",
					messages: [
						{
							role: "user",
							content: `
							"Evaluate whether this message could be spam, fraud, or a threat: '${mensaje}'. Respond only with 'true' if it is risky or 'false' if it seems safe. Consider the following when evaluating:"
							
							Criteria to identify risky messages:
							- Urgency or pressure to act quickly: Messages that insist on immediate action, such as 'respond now!', 'limited offer', 'your account will be blocked if you don't act'.
							- Requests for personal or financial information: Asking for data like credit card numbers, passwords, verification codes, or banking information.
							- Suspicious or unknown links: Including URLs that don't match the entity they claim to represent or contain typographical errors.
							- Offers that are too good to be true: Promises of prizes, gifts, or excessive discounts without clear justification.
							- Grammatical or spelling errors: Incorrect language usage, poor spelling, or incoherent phrases.
							- Unknown or unverified senders: Messages from email addresses or phone numbers that are not recognized.
							- Emails or messages that seem to impersonate a legitimate entity: Phishing attempts that mimic well-known companies.
							`
						}
					],
					max_tokens: 10
				})

				const isRisky = evaluation.choices[0]?.message?.content?.trim().toLowerCase() === "true"

				await this.mensajesContactoRepository.update(id, {
					posibleFraude: isRisky ? 1 : 0
				})

				this.logger.log(`Message ${id} evaluated as ${isRisky ? "risky" : "safe"}`)
				return { id, isRisky }
			} catch (error) {
				this.logger.error(`Error evaluating message ${id}: ${error}`)
				return null
			}
		})

		await Promise.all(promises)

		this.logger.log("[handleEvalConatctMessageRisk] Finished")
	}

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

	@Cron(CronExpression.EVERY_DAY_AT_6AM)
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

	@Cron(CronExpression.EVERY_DAY_AT_7AM)
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

	@Cron(CronExpression.EVERY_DAY_AT_8PM)
	async handleMembershipExpired60Days() {
		this.logger.log("[handleMembershipExpired60Days] Running")
		const stores60DaysExpired = await this.findStores60DaysExpired()

		if (stores60DaysExpired.length === 0) {
			this.logger.warn("No stores 60 days expired found")
			return
		}

		this.logger.log(`Found ${stores60DaysExpired.length} stores 60 days expired`)

		const filteredMails = stores60DaysExpired
			.map((store) => store?.tiendasInfo?.emailTienda)
			.filter((email) => email !== null)

		await this.mailsService.sendMassiveEmail({
			to: filteredMails as string[],
			templateId: MEMBERSHIP_EXPIRED_60_DAYS_SENDGRID_TEMPLATE_ID
		})

		await this.tiendasRepository.update(
			stores60DaysExpired.map(({ id }) => id),
			{ notifiedAs60DaysExpired: true }
		)

		this.logger.log("Emails sent successfully")

		this.logger.log("[handleMembershipExpired60Days] Finished")
	}

	async findStores60DaysExpired() {
		const date60DaysBefore = this.getDateNDaysBeforeFromNow(60)
		const date30DaysBefore = this.getDateNDaysBeforeFromNow(30)
		const currentDate = new Date().toISOString()

		return await this.tiendasRepository
			.createQueryBuilder("store")
			.andWhere("DATE(store.createdAt) = DATE(:date60DaysBefore)", { date60DaysBefore })
			.andWhere("store.fechaExpiracion <= DATE(:currentDate)", { currentDate })
			.andWhere("store.fechaExpiracion > DATE(:date30DaysBefore)", { date30DaysBefore })
			.innerJoin("store.tiendasInfo", "storeInfo")
			.select(["store.id", "store.nombre", "storeInfo.emailTienda", "store.fechaExpiracion"])
			.getMany()
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

	async findStoresWithoutExpire() {
		const date30DaysBefore = this.getDateNDaysBeforeFromNow(30)
		const currentDate = new Date().toISOString()

		return await this.tiendasRepository
			.createQueryBuilder("store")
			.andWhere("store.fechaExpiracion >= DATE(:currentDate)", { currentDate })
			.innerJoin("store.tiendasInfo", "storeInfo")
			.select(["store.id", "store.fechaExpiracion", "store.logo"])
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
