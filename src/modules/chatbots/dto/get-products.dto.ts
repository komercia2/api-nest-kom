import { IsNotEmpty, IsString } from "class-validator"

export class GetProductsDto {
	@IsNotEmpty()
	@IsString()
	readonly name: string
}
