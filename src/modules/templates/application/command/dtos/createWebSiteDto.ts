import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateWebSiteDto {
	@IsString()
	@IsNotEmpty()
	_id: string

	@IsString()
	subdomain: string

	@IsNumber()
	templateNumber: number

	@IsString()
	domain: string

	@IsBoolean()
	isMain: boolean

	@IsBoolean()
	active: boolean
}
