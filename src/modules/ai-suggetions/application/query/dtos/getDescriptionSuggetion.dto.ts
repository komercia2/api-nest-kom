import {
	ArrayMinSize,
	ArrayNotEmpty,
	IsArray,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	Max,
	Min
} from "class-validator"

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

	@IsInt()
	@Min(20)
	@Max(120)
	@IsOptional()
	nWords = 50
}
