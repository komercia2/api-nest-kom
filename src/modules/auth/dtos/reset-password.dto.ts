import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class ResetPassworDto {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	readonly email: string
}

export class RestorePasswordDto {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	readonly email: string

	@IsNotEmpty()
	@IsString()
	readonly newPassword: string

	@IsNotEmpty()
	@IsString()
	readonly token: string
}
