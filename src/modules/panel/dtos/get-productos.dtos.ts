import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class GetProductsDtos {
	@IsOptional()
	@IsString()
	readonly name?: string

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	readonly freeShipping?: number

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	readonly withVariants?: number

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	readonly categoryID: number

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	readonly favorite: number

	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	readonly page: number

	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	readonly limit: number
}
