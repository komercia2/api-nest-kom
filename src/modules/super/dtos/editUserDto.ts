import { Type } from "class-transformer"
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator"

export class EditUserDto {
	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	readonly userId: number

	@IsOptional()
	@IsString()
	@Length(6)
	readonly newPassword: string

	@IsOptional()
	@IsString()
	readonly name: string

	@IsOptional()
	@IsString()
	@IsEmail()
	readonly email: string

	@IsOptional()
	@IsString()
	@IsEmail()
	readonly phone: string
}
