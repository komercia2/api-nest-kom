import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class RedeemMultipleSubscriptionDto {
	@IsNumber()
	@Type(() => Number)
	storeId: number

	@IsString()
	@IsNotEmpty()
	coupon: string
}
