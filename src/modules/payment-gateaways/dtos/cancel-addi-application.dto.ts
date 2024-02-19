import { IsNumber, IsString } from "class-validator"

export class CancelAddiApplicationDto {
	@IsString()
	orderId: number

	@IsString()
	amount: number

	@IsString()
	environment: string

	@IsNumber()
	storeId: number
}
