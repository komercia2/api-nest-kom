import { Type } from "class-transformer"
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class CreateStoreDto {
	@IsNotEmpty()
	@IsString()
	readonly nombre_tienda: string

	@IsNotEmpty()
	@IsString()
	readonly nombre: string

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	readonly email: string

	@IsNotEmpty()
	@IsString()
	readonly celular: string

	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	readonly password: string

	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	readonly entidad: number

	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	readonly pais: number

	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	readonly ciudad: number

	@IsNotEmpty()
	@IsBoolean()
	@Type(() => Boolean)
	readonly number_verified: boolean
}
