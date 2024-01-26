import { Type } from "class-transformer"
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class FilterSuscriptionDto {
	@IsNumber()
	@Type(() => Number)
	readonly page: number

	@IsNumber()
	@Type(() => Number)
	readonly limit: number

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	readonly id?: number

	@IsOptional()
	@IsString()
	readonly email?: string

	@IsOptional()
	@IsString()
	readonly name?: string

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	readonly storeId?: number

	@IsOptional()
	@IsString()
	readonly subscriptionId?: string

	@IsOptional()
	@IsString()
	readonly customerId?: string

	@IsOptional()
	@IsBoolean()
	@Type(() => Boolean)
	readonly expired?: boolean

	@IsOptional()
	@IsBoolean()
	@Type(() => Boolean)
	readonly toExpire?: boolean
}
