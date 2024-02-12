import { Type } from "class-transformer"
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class AddiPaymentDto {
	@IsString()
	@IsNotEmpty()
	@IsIn(["STAGING", "PRODUCTION"])
	env: string

	@IsNumber()
	@Type(() => Number)
	storeId: number
}
