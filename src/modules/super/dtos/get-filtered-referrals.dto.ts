import { IsOptional, IsString } from "class-validator"

export class GetFilteredReferralsDto {
	@IsOptional()
	@IsString()
	readonly name: string

	@IsOptional()
	@IsString()
	readonly email: string

	@IsOptional()
	@IsString()
	readonly identification: string
}
