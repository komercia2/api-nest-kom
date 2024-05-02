import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class SendMassiveEmailsDto {
	@IsArray()
	@IsNotEmpty()
	readonly to: string[]

	@IsString()
	@IsNotEmpty()
	readonly templateId: string
}
