import { Body, Controller, Post } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

import { SendVerifyCodeDto } from "./dtos/send-verify-code.dto"
import { VerifyCodeDto } from "./dtos/verify-code.dto"
import { TwilioService } from "./twilio.service"

@ApiTags("twilio")
@Controller("twilio")
export class TwilioController {
	constructor(private readonly twilioService: TwilioService) {}

	@Post("send-verify-code")
	async sendVerifyCode(@Body() dto: SendVerifyCodeDto) {
		return this.twilioService.sendVerifyCode(dto)
	}

	@Post("verify-code")
	async verifyCode(@Body() dto: VerifyCodeDto) {
		return this.twilioService.verifyCode(dto)
	}
}
