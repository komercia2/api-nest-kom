import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdateOrderStatusDto {
	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	readonly orderId: number

	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	readonly userId: number

	@IsNotEmpty()
	@IsString()
	@IsNotEmpty()
	readonly status: string

	@IsNotEmpty()
	@IsString()
	@IsNotEmpty()
	readonly method: string
}
