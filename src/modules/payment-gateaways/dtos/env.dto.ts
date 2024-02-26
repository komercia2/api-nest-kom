import { Type } from "class-transformer"
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class AddiPaymentDto {
	@IsNumber()
	@Type(() => Number)
	storeId: number
}
