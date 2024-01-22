import { Transform } from "class-transformer"
import { IsDate, IsIn, IsNumber, IsOptional, IsString, Max, Min } from "class-validator"

export class FilterSalesDto {
	@IsNumber()
	@Min(1)
	@Transform(({ value }) => parseInt(value))
	readonly page: number

	@IsNumber()
	@Min(1)
	@Max(100)
	@Transform(({ value }) => parseInt(value))
	readonly limit: number

	@IsNumber()
	@Transform(({ value }) => parseInt(value))
	readonly storeId: number

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => parseInt(value))
	readonly id: number

	@IsOptional()
	@IsString()
	readonly state: string

	@IsOptional()
	@IsString()
	readonly paymentMethod: string

	@IsOptional()
	@IsDate()
	@Transform(({ value }) => new Date(value))
	readonly startDate: Date

	@IsOptional()
	@IsDate()
	@Transform(({ value }) => new Date(value))
	readonly endDate: Date

	@IsOptional()
	@IsString()
	@IsIn(["ASC", "DESC"])
	readonly order: "ASC" | "DESC"

	@IsOptional()
	@IsString()
	clientName: string

	@IsOptional()
	@IsString()
	clientIdentification: string
}
