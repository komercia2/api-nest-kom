import { IsOptional, IsString } from "class-validator"

export class FilterProductAnalyticsDto {
	@IsOptional()
	@IsString()
	readonly name?: string
}
