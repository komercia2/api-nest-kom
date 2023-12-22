import { IsNumber, IsString } from "class-validator"

export class CreateUserAdressDto {
	@IsString()
	direccion: string

	@IsString()
	tag: string

	@IsString()
	nombre: string

	@IsString()
	apellido: string

	@IsString()
	barrio: string

	@IsNumber()
	ciudadId: number

	@IsString()
	celular: string
}
