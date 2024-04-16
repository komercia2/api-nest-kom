import { Type } from "class-transformer"
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString } from "class-validator"

export class FilterSubscriptionCouponsDto {
	@IsNumber()
	@Type(() => Number)
	readonly page: number

	@IsNumber()
	@Type(() => Number)
	readonly limit: number

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	readonly storeId: number

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	readonly amount: number

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	readonly validMonths: number

	@IsOptional()
	@IsString()
	readonly coupon: string

	@IsOptional()
	@IsString()
	@IsIn(["0", "3", "9"])
	readonly plan: string

	@IsOptional()
	@IsBoolean()
	@Type(() => Boolean)
	readonly avaible: boolean
}
