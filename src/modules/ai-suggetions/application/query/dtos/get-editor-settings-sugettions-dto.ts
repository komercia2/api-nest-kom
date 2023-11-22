import {
	ArrayMinSize,
	ArrayNotEmpty,
	IsArray,
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsObject,
	IsOptional,
	IsString
} from "class-validator"

export class getEditorSettingSuggestionsDTO {
	@IsNumber()
	@IsOptional()
	storeId: number

	@IsObject()
	@IsNotEmpty()
	inputSetting: object

	@IsArray()
	@ArrayNotEmpty()
	@ArrayMinSize(1)
	@IsString({ each: true })
	keyWords: string[]

	@IsString()
	@IsNotEmpty()
	theme: string

	@IsOptional()
	@IsBoolean()
	improveAllTexts?: false
}
