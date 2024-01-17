import { IsNotEmpty, IsObject, IsString } from "class-validator"

export class CreateMailDto {
	@IsString()
	@IsNotEmpty()
	readonly to: string

	@IsString()
	@IsNotEmpty()
	readonly templateId: string

	@IsObject()
	@IsNotEmpty()
	readonly dynamicTemplateData: object
}
