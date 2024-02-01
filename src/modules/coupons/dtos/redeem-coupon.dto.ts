import { Type } from "class-transformer"
import { IsNumber, IsString } from "class-validator"

export class RedeemCouponDto {
	@IsNumber()
	@Type(() => Number)
	readonly storeId: number

	@IsString()
	readonly coupon: string
}
