import { Type } from "class-transformer"
import { IsNumber, IsString } from "class-validator"

export class UnlinkStoreAdminDto {
	@IsNumber()
	@Type(() => Number)
	storeId: number

	@IsNumber()
	@Type(() => Number)
	adminId: number

	@IsString()
	@Type(() => String)
	key: string
}
