import { Type } from "class-transformer"
import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator"

export class UpdateStoreDto {
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
	@IsPhoneNumber()
	readonly phone: string

	@IsOptional()
	@IsString()
	readonly description: string

	@IsNumber()
	@Type(() => Number)
	readonly storeId: number
}
