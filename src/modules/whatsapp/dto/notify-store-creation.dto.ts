import { IsEmail, IsIn, IsNumber, IsString } from "class-validator"

export class NotifyStoreCreationDto {
	@IsString()
	storeName: string

	@IsString()
	targetGroup: string

	@IsEmail()
	storeEmail: string

	@IsString()
	@IsIn(["Testing Stores Created", "Team Komercia"])
	clientFullName: string

	@IsNumber()
	storeId: number
}
