import { Type } from "class-transformer"
import { IsDate, IsEnum, IsIn, IsNumber, IsOptional, IsString } from "class-validator"

enum Order {
	ASC = "ASC",
	DESC = "DESC"
}

export class FilterLogsDto {
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	readonly storeId: number

	@IsOptional()
	@IsString()
	readonly name: string

	@IsOptional()
	@IsEnum(Order)
	readonly order: Order
}
