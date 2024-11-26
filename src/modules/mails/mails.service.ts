import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { InjectRepository } from "@nestjs/typeorm"
import { MailService } from "@sendgrid/mail"
import { Logger } from "nestjs-pino"
import { MensajesContacto } from "src/entities"
import { Repository } from "typeorm"

import { CreateMailDto } from "./dto/create-mail.dto"
import { SendMassiveEmailsDto } from "./dto/send-massive-emails.dto"

@Injectable()
export class MailsService {
	private readonly sendgridApiKey = this.configService.get<string>("SENDGRID_API_KEY")
	private readonly sendgridFrom = this.configService.get<string>("SENDGRID_FROM_EMAIL")

	constructor(
		private readonly configService: ConfigService,
		private readonly mailService: MailService,
		private readonly logger: Logger,
		@InjectRepository(MensajesContacto)
		private readonly mensajesContactoRepository: Repository<MensajesContacto>
	) {
		mailService.setApiKey(this.sendgridApiKey as string)
	}

	async sendMassiveEmail(sendMassiveEmailsDto: SendMassiveEmailsDto): Promise<void> {
		const { to, templateId } = sendMassiveEmailsDto
		try {
			await this.mailService.send({
				to: to,
				from: this.sendgridFrom as string,
				templateId
			})
			this.logger.log(`Email sent successfully to ${to.length} recipients`)
		} catch (error) {
			this.logger.error(error)
		}
	}

	async sendCustomEmail(createMailDto: CreateMailDto): Promise<{ success: boolean }> {
		const { to, templateId, dynamicTemplateData, subject } = createMailDto
		try {
			await this.mailService.send({
				to: to,
				from: "no-reply@komercia.co",
				templateId,
				dynamicTemplateData: {
					...dynamicTemplateData,
					subject
				},
				subject
			})
			this.logger.log(`Email sent successfully to ${to}`)
			return { success: true }
		} catch (error) {
			this.logger.error(error)
			return { success: false }
		}
	}

	async sendContactEmail(createMailDto: CreateMailDto): Promise<{ success: boolean }> {
		const { to, templateId, dynamicTemplateData } = createMailDto
		try {
			await this.mailService.send({
				to: to,
				from: this.sendgridFrom as string,
				templateId,
				dynamicTemplateData
			})
			await this.saveMessageSent(createMailDto)
			this.logger.log(`Email sent successfully to ${to}`)
			return { success: true }
		} catch (error) {
			this.logger.error(error)
			return { success: false }
		}
	}

	async saveMessageSent(createMailDto: CreateMailDto): Promise<void> {
		const { dynamicTemplateData, storeId, userId } = createMailDto

		const mensajeContacto = this.mensajesContactoRepository.create({
			email: dynamicTemplateData.clientEmail,
			mensaje: dynamicTemplateData.messsage,
			nombre: dynamicTemplateData.clientName,
			telefono: dynamicTemplateData.clientPhoneNumber,
			usuarioId: userId,
			createdAt: new Date(),
			tiendaId: storeId
		})
		await this.mensajesContactoRepository.save(mensajeContacto)
	}
}
