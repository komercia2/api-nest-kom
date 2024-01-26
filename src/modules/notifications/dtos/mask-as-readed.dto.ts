import { Type } from "class-transformer"
import { IsNumber, IsUUID } from "class-validator"

export class MaskAsReadedDto {
	@IsUUID()
	id: string

	@IsNumber()
	@Type(() => Number)
	storeId: number
}
