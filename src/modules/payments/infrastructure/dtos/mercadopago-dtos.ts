import { IsNumber, IsString } from "class-validator"

export class CreateIntegrationDTO {
	@IsString()
	publicKey: string

	@IsString()
	accessToken: string

	@IsString()
	refreshToken: string

	@IsString()
	collectorId: string | null

	@IsNumber()
	idTienda: number
}
