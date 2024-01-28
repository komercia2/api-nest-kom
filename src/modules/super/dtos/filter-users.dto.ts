import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator"

export class FilterUsersDto {
	@IsNumber()
	@Type(() => Number)
	readonly page: number

	@IsNumber()
	@Type(() => Number)
	@Min(1)
	@Max(100)
	readonly limit: number

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	readonly id: number

	@IsOptional()
	@IsString()
	readonly name: string

	@IsOptional()
	@IsString()
	readonly email: string

	@IsOptional()
	@IsString()
	documentIdentification: string

	@IsOptional()
	@IsString()
	readonly phone: string
}
