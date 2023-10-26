import { IsNumber, IsOptional } from "class-validator"

export class GetPagedStoreBlogsDto {
	@IsOptional()
	page: number

	@IsOptional()
	limit: number
}
