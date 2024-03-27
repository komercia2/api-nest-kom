import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class RedeemDiscountCouponDto {
	@IsString()
	@IsNotEmpty()
	coupon: string

	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	storeId: number
}
