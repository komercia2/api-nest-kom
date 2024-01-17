import { Module } from "@nestjs/common"
import { MailService } from "@sendgrid/mail"

import { MailsController } from "./mails.controller"
import { MailsService } from "./mails.service"

@Module({
	controllers: [MailsController],
	providers: [MailsService, MailService]
})
export class MailsModule {}
