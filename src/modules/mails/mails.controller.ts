import { Body, Controller, Post } from "@nestjs/common"
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger"

import { CreateMailDto } from "./dto/create-mail.dto"
import { MailsService } from "./mails.service"

@ApiTags("Mails")
@Controller()
export class MailsController {
	constructor(private readonly mailsService: MailsService) {}

	@Post("custom-email")
	@ApiResponse({ status: 201 })
	@ApiBody({
		type: CreateMailDto,
		examples: {
			a: {
				summary: "Send custom email for contact store with many fields",
				description: "Example of a body to send custom email for contact store with many fields",
				value: {
					userId: null,
					storeId: 1559,
					to: "jhondoe@example.com",
					templateId: "d-57ff9dee8ab14e77bd0b8ce179b6e46e",
					dynamicTemplateData: {
						messsage: "Contact message",
						clientName: "Jhon Doe",
						storeName: "Jhon Doe Store",
						clientEmail: "jhondoe@example.com",
						clientPhoneNumber: "+573000000000"
					}
				}
			}
		}
	})
	create(@Body() createMailDto: CreateMailDto) {
		return this.mailsService.sendContactEmail(createMailDto)
	}
}
