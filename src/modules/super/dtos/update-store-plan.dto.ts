import { Type } from "class-transformer"
import { IsDate, IsNumber } from "class-validator"

export class UpdateStorePlanDto {
	@IsNumber()
	@Type(() => Number)
	storeId: number

	@IsDate()
	@Type(() => Date)
	expirationDate: Date

	@IsNumber()
	@Type(() => Number)
	plan: number
}
