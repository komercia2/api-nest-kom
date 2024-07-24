import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UpdateIdentificationDocumentDto {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	readonly email: string

	@IsNotEmpty()
	@IsString()
	readonly identificationType: string

	@IsNotEmpty()
	@IsString()
	readonly oldDocument: string

	@IsNotEmpty()
	@IsString()
	readonly newDocument: string
}
