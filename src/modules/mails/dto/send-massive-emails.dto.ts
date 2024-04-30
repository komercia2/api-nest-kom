import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator"

export class SendMassiveEmailsDto {
	@IsArray()
	@IsNotEmpty()
	readonly to: string[]

	@IsString()
	@IsNotEmpty()
	readonly templateId: string

	@IsOptional()
	@IsObject()
	readonly dynamicTemplateData?: Record<string, unknown>
}
