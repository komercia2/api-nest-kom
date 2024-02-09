import { IsEmail, IsIn, IsNumber, IsString } from "class-validator"

export class NotifyStoreCreationDto {
	@IsString()
	storeName: string

	@IsString()
	@IsIn(["Testing Stores Created", "Team Komercia"])
	targetGroup: string

	@IsEmail()
	storeEmail: string

	@IsString()
	clientFullName: string

	@IsNumber()
	storeId: number

	@IsNumber()
	countryId: number
}
