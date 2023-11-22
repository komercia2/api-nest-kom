import { IsOptional } from "class-validator"

export class GetPagedStoreBlogsDto {
	@IsOptional()
	page: number

	@IsOptional()
	limit: number
}

export class StoreBlogsFilterDTO {
	@IsOptional()
	title?: string
}
