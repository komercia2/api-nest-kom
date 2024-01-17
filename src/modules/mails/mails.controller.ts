import { Body, Controller, Post } from "@nestjs/common"

import { CreateMailDto } from "./dto/create-mail.dto"
import { MailsService } from "./mails.service"

@Controller()
export class MailsController {
	constructor(private readonly mailsService: MailsService) {}

	@Post("custom-email")
	create(@Body() createMailDto: CreateMailDto) {
		return this.mailsService.sendCustomEmail(createMailDto)
	}
}
