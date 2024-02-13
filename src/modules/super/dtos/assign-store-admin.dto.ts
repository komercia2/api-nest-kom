import { Type } from "class-transformer"
import { IsNumber } from "class-validator"

export class AssignStoreAdminDto {
	@IsNumber()
	@Type(() => Number)
	storeId: number

	@IsNumber()
	@Type(() => Number)
	adminId: number
}
