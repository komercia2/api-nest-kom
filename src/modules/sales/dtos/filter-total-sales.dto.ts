import { Type } from "class-transformer"
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"

import { TotalSalesType } from "../enums/total-sales.enum"
import { TotalSalesRange } from "../enums/total-sales-range.enum"

export class FilterTotalSalesDto {
	@IsNumber()
	@Type(() => Number)
	readonly storeId: number

	@IsString()
	readonly status: string

	@IsString()
	@IsEnum(TotalSalesRange)
	readonly range: TotalSalesRange

	@IsEnum(TotalSalesType)
	readonly type: TotalSalesType

	@IsOptional({ context: { groups: [TotalSalesType.INTERVAL] } })
	@IsDate()
	@Type(() => Date)
	readonly startDate: Date

	@IsOptional({ context: { groups: [TotalSalesType.INTERVAL] } })
	@IsDate()
	@Type(() => Date)
	readonly endDate: Date

	@IsOptional({ context: { groups: [TotalSalesType.PERIOD] } })
	@IsNumber()
	@Type(() => Number)
	readonly month: number

	@IsOptional({ context: { groups: [TotalSalesType.PERIOD] } })
	@IsNumber()
	@Type(() => Number)
	readonly year: number
}
