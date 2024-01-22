import { Type } from "class-transformer"
import { IsIn, IsNumber, IsString, Max, Min } from "class-validator"

export class GetFilteredStoresDto {
	@IsNumber()
	@Min(1)
	@Type(() => Number)
	readonly page: number

	@IsNumber()
	@Min(1)
	@Max(50)
	@Type(() => Number)
	readonly limit: number

	readonly id?: number

	readonly name: string

	readonly category: string

	readonly city: string

	readonly email: string

	@Type(() => Number)
	readonly entityId: number

	@Type(() => Number)
	readonly template: number

	readonly subdomain: string

	@IsString({ each: true })
	@IsIn(["ASC", "DESC"], { each: true })
	readonly date: "ASC" | "DESC"
}
