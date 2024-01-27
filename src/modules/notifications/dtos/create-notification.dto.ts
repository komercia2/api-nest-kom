import { Type } from "class-transformer"
import { IsJSON, IsNumber, Max, Min } from "class-validator"
export class CreateNotificationDto {
	@IsNumber()
	@Type(() => Number)
	storeId: number

	@IsJSON()
	@Type(() => Object)
	notification: Record<string, unknown>

	@IsNumber()
	@Max(10)
	@Min(1)
	@Type(() => Number)
	priority: number
}
