import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class SaveAddiCredentialsDto {
	@IsNumber()
	@Type(() => Number)
	storeId: number

	@IsString()
	@IsNotEmpty()
	clientID: string

	@IsString()
	@IsNotEmpty()
	clientSecret: string
}
