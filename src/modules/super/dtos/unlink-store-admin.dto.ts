import { Type } from "class-transformer"
import { IsBase64, IsNumber, IsString } from "class-validator"

export class UnlinkStoreAdminDto {
	@IsNumber()
	@Type(() => Number)
	storeId: number

	@IsNumber()
	@Type(() => Number)
	adminId: number

	@IsString()
	@IsBase64()
	@Type(() => String)
	key: string
}
