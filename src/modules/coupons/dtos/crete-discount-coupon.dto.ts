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

export class CreateDiscountCouponDto {
	@IsString()
	@IsNotEmpty()
	@Transform(({ value }) => value.toUpperCase())
	readonly coupon: string

	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	@IsIn([0, 1])
	readonly status: number

	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	@IsIn([0, 1])
	readonly type: number

	@IsNumber()
	@ValidateIf((params) => params.type === 0, {
		message: "Percentage value is required for percentage type"
	})
	@Type(() => Number)
	readonly percentage_value: number

	@IsNumber()
	@ValidateIf((params) => params.type === 1, {
		message: "Fixed price value is required for fixed price type"
	})
	@Type(() => Number)
	readonly fixed_price_value: number

	@IsNumber()
	@Type(() => Number)
	@IsIn([0, 1])
	readonly public: number

	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	readonly claim_limit: number

	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	readonly product_id: number

	@IsNumber()
	@Type(() => Number)
	readonly store_id: number

	@ValidateIf((params) => params?.claim_limit_per_client, {
		message: "Client id is required when claim limit per client is provided"
	})
	@IsNumber()
	@Type(() => Number)
	readonly client_id: number

	@ValidateIf((params) => params?.client_id, {
		message: "Claim limit per client is required when client_id is provided"
	})
	@IsNumber()
	@Type(() => Number)
	readonly claim_limit_per_client: number

	@IsDate()
	@IsOptional()
	@Type(() => Date)
	readonly expiration_date: Date
}
