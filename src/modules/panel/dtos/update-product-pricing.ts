import { Type } from "class-transformer"
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

import { IProductCombination } from "../interfaces/products"

export class UpdateProductPricingDto {
	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	readonly id: number

	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	readonly storeID: number

	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	readonly precio: number

	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	readonly unidades: number

	@IsOptional()
	@IsArray()
	readonly combinaciones: IProductCombination[]
}
