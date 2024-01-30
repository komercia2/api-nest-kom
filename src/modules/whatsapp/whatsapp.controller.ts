import { Body, Controller, Post, UseGuards } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"

import { NotifyStoreCreationDto } from "./dto/notify-store-creation.dto"
import { WhatsappService } from "./whatsapp.service"

@ApiTags("Whatsapp")
@Controller()
export class WhatsappController {
	constructor(private readonly whatsappService: WhatsappService) {}

	@UseGuards(PublicApiKeyAuthMiddleware)
	@Post("store-creation")
	notifyStoreCreation(@Body() notifyStoreCreation: NotifyStoreCreationDto) {
		return this.whatsappService.notifyStoreCreation(notifyStoreCreation)
	}
}
