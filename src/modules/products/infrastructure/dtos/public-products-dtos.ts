import { Type } from "class-transformer"
import { IsArray, IsNumber } from "class-validator"

export class GetManyProductsByIdsDto {
	@IsArray()
	@Type(() => Number)
	ids: number[]

	@IsNumber()
	@Type(() => Number)
	storeId: number
}
