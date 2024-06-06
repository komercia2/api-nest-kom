import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator"

export class GetStoreViewsHistoryDto {
	@IsOptional()
	@Type(() => Date)
	startDate?: Date

	@IsOptional()
	@Type(() => Date)
	endDate?: Date

	@IsNumber()
	@IsPositive()
	@IsNotEmpty()
	storeId: number
}
