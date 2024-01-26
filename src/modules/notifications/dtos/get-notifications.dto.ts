import { Type } from "class-transformer"
import { IsNumber } from "class-validator"

export class GetNotificationsDto {
	@IsNumber()
	@Type(() => Number)
	readonly storeId: number

	@IsNumber()
	@Type(() => Number)
	readonly page: number

	@IsNumber()
	@Type(() => Number)
	readonly limit: number
}
