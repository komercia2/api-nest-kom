import { Type } from "class-transformer"
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator"

export class FindAllDiscountCouponsDto {
	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	@Min(1)
	readonly page: number

	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	@Min(1)
	@Max(100)
	readonly limit: number

	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	readonly store_id: number

	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	@IsIn([0, 1])
	readonly status: number

	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	@IsIn([0, 1])
	readonly type: number

	@IsString()
	@IsOptional()
	readonly coupon: string

	@IsString()
	@IsOptional()
	readonly product: string

	@IsString()
	@IsOptional()
	readonly user: string
}
