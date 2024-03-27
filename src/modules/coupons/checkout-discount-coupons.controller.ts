import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common"
import { CheckoutJwtGuard } from "@shared/infrastructure/guards"

import { CouponsPlusService } from "./coupons-plus.service"
import { RedeemDiscountCouponDto } from "./dtos/redeem-discount-coupon.dto"

@Controller("checkout/discount-coupons")
export class CheckoutDiscountCouponsController {
	constructor(private readonly couponsService: CouponsPlusService) {}

	@UseGuards(CheckoutJwtGuard)
	@Post("redeem")
	async redeemCoupon(@Body() redeemDiscountCouponDto: RedeemDiscountCouponDto) {
		return await this.couponsService.redeemCoupon(redeemDiscountCouponDto)
	}

	@UseGuards(CheckoutJwtGuard)
	@Get("check/:store_id/:coupon")
	async findValidCoupon(@Param("store_id") store_id: number, @Param("coupon") coupon: string) {
		return await this.couponsService.findValidCoupon(coupon, +store_id)
	}
}
