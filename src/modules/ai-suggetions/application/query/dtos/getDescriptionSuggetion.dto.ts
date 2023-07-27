import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator"

export class GetDescriptionSuggetionDto {
	@IsNotEmpty()
	@IsString()
	productName: string

	@IsNotEmpty()
	@IsString()
	language: string

	@IsArray()
	@ArrayNotEmpty()
	@ArrayMinSize(1)
	keyWords: string[]
}
