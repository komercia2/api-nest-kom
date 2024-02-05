import { Type } from "class-transformer"
import { IsIn, IsNumber, Max, Min } from "class-validator"

export class CreateSubscriptionCouponDto {
	@IsNumber()
	@IsIn([0, 1])
	@Type(() => Number)
	readonly available: number

	@IsNumber()
	@Type(() => Number)
	@IsIn([0, 3, 9])
	readonly plan: number

	@IsNumber()
	@Type(() => Number)
	readonly validMonths: number

	@IsNumber()
	@Type(() => Number)
	@Max(200)
	@Min(1)
	readonly amount: number
}
