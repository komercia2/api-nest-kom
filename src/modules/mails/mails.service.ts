import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { MailService } from "@sendgrid/mail"
import { Logger } from "nestjs-pino"

import { CreateMailDto } from "./dto/create-mail.dto"

@Injectable()
export class MailsService {
	private readonly sendgridApiKey = this.configService.get<string>("SENDGRID_API_KEY")
	private readonly sendgridFrom = this.configService.get<string>("SENDGRID_FROM_EMAIL")

	constructor(
		private readonly configService: ConfigService,
		private readonly mailService: MailService,
		private readonly logger: Logger
	) {
		mailService.setApiKey(this.sendgridApiKey as string)
	}

	async sendCustomEmail(createMailDto: CreateMailDto): Promise<void> {
		const { to, templateId, dynamicTemplateData } = createMailDto
		try {
			await this.mailService.send({
				to: to,
				from: this.sendgridFrom as string,
				templateId,
				dynamicTemplateData
			})
			this.logger.log(`Email sent successfully to ${to}`)
		} catch (error) {
			this.logger.error(error)
		}
	}
}
