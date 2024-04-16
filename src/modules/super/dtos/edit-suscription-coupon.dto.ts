import {
	IsBoolean,
	IsDate,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString
} from "class-validator"

import { CouponsType } from "../enums/coupons"

export class EditSusctiptionCouponDto {
	@IsNotEmpty()
	id: number | string

	@IsNotEmpty()
	@IsEnum(CouponsType)
	type: CouponsType

	@IsOptional()
	@IsNumber()
	amount: number

	@IsOptional()
	@IsNumber()
	plan: number

	@IsOptional()
	@IsNumber()
	validMonths: number

	@IsOptional()
	@IsBoolean()
	available: boolean

	@IsOptional()
	@IsDate()
	startDate: Date

	@IsOptional()
	@IsDate()
	endDate: Date
}
