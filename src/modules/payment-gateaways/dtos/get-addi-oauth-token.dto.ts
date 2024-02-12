import { IsNotEmpty, IsString } from "class-validator"

export class GetAddiOAuthTokenDto {
	@IsString()
	@IsNotEmpty()
	audience: string

	@IsString()
	@IsNotEmpty()
	client_id: string

	@IsString()
	@IsNotEmpty()
	client_secret: string
}
