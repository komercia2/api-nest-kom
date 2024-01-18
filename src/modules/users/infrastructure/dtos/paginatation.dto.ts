import { Transform } from "class-transformer"
import { IsNumber, Max, Min } from "class-validator"

export class PaginationDto {
	@IsNumber()
	@Min(1)
	@Transform(({ value }) => parseInt(value))
	page: number

	@IsNumber({ allowNaN: false })
	@Min(1)
	@Max(100)
	@Transform(({ value }) => parseInt(value))
	limit: number
}
