import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator"

export class CreateWebSiteDto {
	subdomain: string | null

	@IsNumber()
	@IsNotEmpty()
	templateNumber: number

	domain: string | null

	@IsBoolean()
	isMain: boolean

	@IsBoolean()
	active: boolean
}
