import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

import { CouponsPlusService } from "./coupons-plus.service"
import { CreateDiscountCouponDto } from "./dtos/crete-discount-coupon.dto"
import { FindAllDiscountCouponsDto } from "./dtos/find-all-discount-coupons.dto"
import { UpdateDiscountCouponDto } from "./dtos/update-coupons.dto"

@ApiTags("Coupons")
@Controller("discount-coupons")
export class DiscountCouponsController {
	constructor(private readonly couponsService: CouponsPlusService) {}

	@Delete("deactivate/:coupon/:store_id")
	async deactivateCoupon(@Param("coupon") coupon: string, @Param("store_id") storeId: number) {
		return await this.couponsService.deactivateCoupon(coupon, +storeId)
	}

	@Put()
	async updateCoupon(@Body() updateCouponDto: UpdateDiscountCouponDto) {
		return await this.couponsService.updateCoupon(updateCouponDto)
	}

	@Get()
	async findAllCoupons(@Query() findAllDiscountCouponsDto: FindAllDiscountCouponsDto) {
		return await this.couponsService.findAllCoupons(findAllDiscountCouponsDto)
	}

	@Post()
	async createCoupon(@Body() coupon: CreateDiscountCouponDto) {
		return await this.couponsService.createCoupon(coupon)
	}
}
