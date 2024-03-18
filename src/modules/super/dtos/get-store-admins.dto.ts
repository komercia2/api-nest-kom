import { Type } from "class-transformer"
import { IsNumber, Max, Min } from "class-validator"

export class GetStoreAdminsDto {
	@IsNumber()
	@Type(() => Number)
	readonly page: number

	@IsNumber()
	@Type(() => Number)
	@Min(1)
	@Max(100)
	readonly limit: number

	@IsNumber()
	@Type(() => Number)
	readonly storeId: number
}
