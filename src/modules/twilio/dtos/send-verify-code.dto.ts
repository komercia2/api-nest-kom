import { IsEnum, IsNotEmpty, IsString } from "class-validator"

import { CHANNELS } from "../enums/channels"

export class SendVerifyCodeDto {
	@IsString()
	@IsNotEmpty()
	readonly phoneNumber: string

	@IsEnum(CHANNELS)
	@IsNotEmpty()
	readonly channel: CHANNELS
}
