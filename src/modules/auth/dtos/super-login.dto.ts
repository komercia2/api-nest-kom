import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SuperLoginDto {
	@IsEmail()
	@IsNotEmpty()
	@ApiProperty()
	readonly email: string

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	readonly password: string

	@IsNotEmpty()
	@ApiProperty()
	readonly superClientSecret: string
}
