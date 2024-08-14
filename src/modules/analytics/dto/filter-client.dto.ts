import { IsOptional, IsString } from "class-validator"

export class FilterClientDto {
	@IsOptional()
	@IsString()
	readonly name?: string
}
