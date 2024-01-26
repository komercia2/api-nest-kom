import { Type } from "class-transformer"
import { IsJSON, IsNumber } from "class-validator"
export class CreateNotificationDto {
	@IsNumber()
	@Type(() => Number)
	storeId: number

	@IsJSON()
	@Type(() => Object)
	notification: Record<string, unknown>
}
