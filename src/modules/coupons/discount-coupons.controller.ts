import { Body, Controller, Get, Post, Query } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

import { CouponsPlusService } from "./coupons-plus.service"
import { CreateDiscountCouponDto } from "./dtos/crete-discount-coupon.dto"
import { FindAllDiscountCouponsDto } from "./dtos/find-all-discount-coupons.dto"

@ApiTags("Coupons")
@Controller("discount-coupons")
export class DiscountCouponsController {
	constructor(private readonly couponsService: CouponsPlusService) {}

	@Get()
	async findAllCoupons(@Query() findAllDiscountCouponsDto: FindAllDiscountCouponsDto) {
		return await this.couponsService.findAllCoupons(findAllDiscountCouponsDto)
	}

	@Post()
	async createCoupon(@Body() coupon: CreateDiscountCouponDto) {
		return await this.couponsService.createCoupon(coupon)
	}
}
