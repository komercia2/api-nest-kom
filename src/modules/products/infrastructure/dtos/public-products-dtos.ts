import { IsArray, IsNumber } from "class-validator"

export class GetManyProductsByIdsDto {
	@IsArray()
	@IsNumber({}, { each: true })
	ids: number[]

	@IsNumber()
	storeId: number
}
