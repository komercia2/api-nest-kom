import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber } from "class-validator"

export class CreatePayUOrderDto {
	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	readonly storeId: number

	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	readonly cartId: number

	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	readonly total: number
}
