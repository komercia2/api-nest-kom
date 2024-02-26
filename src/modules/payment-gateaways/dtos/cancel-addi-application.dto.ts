import { IsNumber, IsString } from "class-validator"

export class CancelAddiApplicationDto {
	@IsString()
	orderId: number

	@IsString()
	amount: number

	@IsNumber()
	storeId: number
}
