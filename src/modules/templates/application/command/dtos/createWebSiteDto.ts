import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class CreateWebSiteDto {
	subdomain: string | null

	@IsNumber()
	@IsNotEmpty()
	templateNumber: number

	domain: string | null

	@IsOptional()
	demoId?: number | string

	@IsBoolean()
	isMain: boolean

	@IsBoolean()
	active: boolean
}
