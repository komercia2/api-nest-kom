import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateWebSiteDto {
	@IsString()
	@IsNotEmpty()
	subdomain: string

	@IsNumber()
	@IsNotEmpty()
	templateNumber: number

	@IsString()
	domain: string

	@IsBoolean()
	isMain: boolean

	@IsBoolean()
	active: boolean
}
