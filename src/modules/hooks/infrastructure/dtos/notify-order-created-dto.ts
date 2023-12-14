import { IsNumber, IsString } from "class-validator"

export class NotifyOrderCreatedDto {
	@IsNumber()
	orderId: number

	@IsNumber()
	storeId: number

	@IsNumber()
	amount: number

	@IsString()
	paymentMethod: string
}
