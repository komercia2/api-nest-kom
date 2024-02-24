import { IsIn, IsNumber } from "class-validator"

export class ChangeAddiModeDto {
	@IsNumber()
	storeId: number

	@IsNumber()
	@IsIn([0, 1])
	productionMode: number
}
