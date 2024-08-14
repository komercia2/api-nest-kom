import { Type } from "class-transformer"
import { IsBoolean, IsOptional, IsString } from "class-validator"

export class FilterClientDto {
	@IsOptional()
	@IsString()
	readonly name?: string

	@IsOptional()
	@IsBoolean()
	@Type(() => Boolean)
	readonly sortByName?: boolean

	@IsOptional()
	@IsBoolean()
	@Type(() => Boolean)
	readonly sortByTotal?: boolean

	@IsOptional()
	@IsBoolean()
	@Type(() => Boolean)
	readonly sortByTotalCarts?: boolean
}
