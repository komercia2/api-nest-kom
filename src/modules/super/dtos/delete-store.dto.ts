import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class DeleteStoreDto {
	@IsNotEmpty()
	@IsNumber()
	storeId: number

	@IsNotEmpty()
	@IsString()
	key: string
}
