import { Type } from "class-transformer"
import { IsIn, IsNumber, Min } from "class-validator"

export class CreateMultipleSubscriptionCouponDto {
	@IsNumber()
	@Min(1)
	@Type(() => Number)
	quantity: number

	@IsNumber()
	@Type(() => Number)
	plan: number

	@IsNumber()
	@Type(() => Number)
	validMonths: number

	@IsNumber()
	@Type(() => Number)
	@IsIn([0, 1])
	available: number
}
