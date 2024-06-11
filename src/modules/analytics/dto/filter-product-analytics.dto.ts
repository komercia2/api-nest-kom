import { Type } from "class-transformer"
import { IsOptional, IsString } from "class-validator"

export class FilterProductAnalyticsDto {
	@IsOptional()
	@IsString()
	readonly name?: string

	@IsOptional()
	@Type(() => Date)
	readonly startDate?: Date

	@IsOptional()
	@Type(() => Date)
	readonly endDate?: Date
}
