import { IsNotEmpty, IsString } from "class-validator"

export class PanelLoginDto {
	@IsNotEmpty()
	@IsString()
	readonly email: string

	@IsNotEmpty()
	@IsString()
	readonly password: string
}
