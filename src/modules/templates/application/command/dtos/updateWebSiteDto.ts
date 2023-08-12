import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

export class UpdateWebSiteDto {
	@IsString()
	@IsNotEmpty()
	subdomain: string

	@IsString()
	domain: string

	@IsBoolean()
	isMain: boolean

	@IsBoolean()
	active: boolean
}
