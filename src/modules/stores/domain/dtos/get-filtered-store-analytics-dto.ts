import { Transform } from "class-transformer"
import {
	IsBoolean,
	IsDate,
	IsEnum,
	IsIn,
	IsNumber,
	IsOptional,
	IsString,
	MaxDate
} from "class-validator"

import { StoreAnalyticsEvent } from "../entities"

export class GetFilteredStoreAnalyticsDto {
	@IsEnum(StoreAnalyticsEvent)
	readonly event: StoreAnalyticsEvent

	@IsOptional()
	@IsDate()
	@Transform(({ value }) => new Date(value))
	readonly startDate?: Date

	@IsOptional()
	@IsDate()
	@MaxDate(new Date())
	@Transform(({ value }) => new Date(value))
	readonly endDate?: Date

	@IsOptional()
	@IsString()
	@IsIn(["DESKTOP", "MOBILE", "TABLET", "OTHER"])
	@Transform(({ value }) => value.toUpperCase())
	readonly device?: string

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => +value)
	readonly productId?: number

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => +value)
	readonly categoryId?: number

	@IsBoolean()
	@Transform(({ value }) => Boolean(value))
	readonly mostRecent: boolean
}
