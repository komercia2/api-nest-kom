import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class EncryptWompiIntegrityDto {
	@IsString()
	@IsNotEmpty()
	public readonly reference: string

	@IsString()
	@IsNotEmpty()
	public readonly transactionAmount: string

	@IsString()
	@IsNotEmpty()
	public readonly currency: string

	@IsNumber()
	@Type(() => Number)
	public readonly storeId: number
}
