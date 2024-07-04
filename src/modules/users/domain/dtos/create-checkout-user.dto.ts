import { Type } from "class-transformer"
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateCheckoutUserDto {
	@IsNotEmpty()
	@IsString()
	readonly identificationType: string

	@IsNotEmpty()
	@IsString()
	readonly document: string

	@IsNotEmpty()
	@IsString()
	readonly firstName: string

	@IsNotEmpty()
	@IsString()
	readonly lastName: string

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	readonly email: string

	@IsOptional()
	@IsBoolean()
	readonly gender: boolean

	@IsNotEmpty()
	@IsString()
	readonly phone: string

	@IsNotEmpty()
	@IsString()
	readonly code: string

	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	readonly cityId: number
}
