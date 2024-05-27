import { Type } from "class-transformer"
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateStoreDto {
	@IsNotEmpty()
	@IsString()
	readonly storeName: string

	@IsOptional()
	@IsString()
	readonly domain: string

	@IsString()
	readonly subdomain: string

	@IsNumber()
	@Type(() => Number)
	readonly categoryId: number

	@IsNumber()
	@Type(() => Number)
	readonly countryId: number

	@IsNumber()
	@Type(() => Number)
	readonly template: number

	@IsOptional()
	@IsEmail()
	readonly email: string

	@IsOptional()
	readonly phone: string

	@IsOptional()
	@IsString()
	readonly description: string

	@IsNumber()
	@Type(() => Number)
	readonly storeId: number
}
