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

	readonly country: string

	readonly email: string

	readonly suscription: number

	@Type(() => Number)
	readonly entityId: number

	@Type(() => Number)
	readonly template: number

	readonly subdomain: string

	@Type(() => Boolean)
	readonly expired: boolean

	@Type(() => Boolean)
	readonly withoutExpire: boolean

	@Type(() => Boolean)
	readonly withSuscriptionCoupon: boolean

	@Type(() => Boolean)
	readonly toExpire: boolean

	@IsString({ each: true })
	@IsIn(["ASC", "DESC"], { each: true })
	readonly date: "ASC" | "DESC"

	readonly phone: string

	@Type(() => Boolean)
	readonly refferal: boolean
}
