import { Transform } from "class-transformer"
import { IsIn, IsNotEmpty, IsString } from "class-validator"

export class GetStoreTemplateSettingsDTO {
	@IsNotEmpty()
	@Transform(({ value }) => Number(value))
	@IsIn([5, 99], { message: "Template must be 5 or 99" })
	template: number

	@IsString()
	@IsNotEmpty()
	storeId: string
}
