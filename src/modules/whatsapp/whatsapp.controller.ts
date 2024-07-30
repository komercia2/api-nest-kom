import { Controller, Get } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

import { WhatsappService } from "./whatsapp.service"

@ApiTags("Whatsapp")
@Controller()
export class WhatsappController {
	constructor(private readonly whatsappService: WhatsappService) {}

	@Get("status")
	async getStatus() {
		return this.whatsappService.getStaatus()
	}
}
