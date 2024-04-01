import { Transform, Type } from "class-transformer"
import {
	IsDate,
	IsIn,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	ValidateIf
} from "class-validator"

export class UpdateDiscountCouponDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@Transform(({ value }) => value.toUpperCase())
	readonly coupon: string

	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	@IsIn([0, 1])
	readonly status: number

	@IsOptional()
	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	@IsIn([0, 1])
	readonly type: number

	@IsOptional()
	@IsNumber()
	@ValidateIf((params) => params.type === 0, {
		message: "Percentage value is required for percentage type"
	})
	@Type(() => Number)
	readonly percentage_value: number

	@IsOptional()
	@IsNumber()
	@ValidateIf((params) => params.type === 1, {
		message: "Fixed price value is required for fixed price type"
	})
	@Type(() => Number)
	readonly fixed_price_value: number

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	@IsIn([0, 1])
	readonly public: number

	@IsOptional()
	@ValidateIf((params) => params?.client_id, {
		message: "Claim limit per client is required when client id is provided"
	})
	@IsNumber()
	@Type(() => Number)
	readonly claim_limit: number

	@IsOptional()
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	readonly product_id: number

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	readonly client_id: number

	@IsOptional()
	@IsDate()
	@IsOptional()
	@Type(() => Date)
	readonly expiration_date: Date

	@IsOptional()
	@IsDate()
	@IsOptional()
	@Type(() => Date)
	readonly deleted_at: Date
}
