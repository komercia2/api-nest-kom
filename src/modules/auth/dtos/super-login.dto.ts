import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SuperLoginDto {
	@IsEmail()
	@IsNotEmpty()
	readonly email: string

	@IsString()
	@IsNotEmpty()
	readonly password: string

	@IsNotEmpty()
	readonly superClientSecret: string
}
