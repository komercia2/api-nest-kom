import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator"

import { ContactMailWithManyFields } from "../types/mails"

export class CreateMailDto {
	@IsString()
	@IsNotEmpty()
	readonly to: string

	readonly userId?: number

	@IsString()
	@IsNotEmpty()
	readonly templateId: string

	@IsObject()
	@IsNotEmpty()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly dynamicTemplateData: any

	@IsNumber()
	@IsNotEmpty()
	readonly storeId: number
}
