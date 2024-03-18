import { Type } from "class-transformer"
import { IsNumber } from "class-validator"

export class GetOrderDto {
	@IsNumber()
	@Type(() => Number)
	readonly orderId: number

	@IsNumber()
	@Type(() => Number)
	readonly storeId: number

	@IsNumber()
	@Type(() => Number)
	readonly userId: number
}
