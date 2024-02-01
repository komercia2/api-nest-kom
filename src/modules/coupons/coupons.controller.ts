import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Query } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

import { CouponsService } from "./coupons.service"
import { CreateSubscriptionCouponDto } from "./dtos/create-coupon.dto"
import { FilterSubscriptionCouponsDto } from "./dtos/filter-subscription-cuopons"
import { RedeemCouponDto } from "./dtos/redeem-coupon.dto"

@ApiTags("Coupons")
@Controller()
export class CouponsController {
	constructor(private readonly couponsService: CouponsService) {}

	@Get("check/store")
	@HttpCode(HttpStatus.OK)
	checkStore(@Query("storeId") storeId: number) {
		return this.couponsService.storeHasCoupon(storeId)
	}

	@Get("check/coupon")
	@HttpCode(HttpStatus.OK)
	checkCoupon(@Query("coupon") coupon: string) {
		return this.couponsService.isCouponAvailable(coupon)
	}

	@Put("redeem")
	@HttpCode(HttpStatus.OK)
	redeemCoupon(@Body() redeemCouponDto: RedeemCouponDto) {
		return this.couponsService.redeemCoupon(redeemCouponDto)
	}
}
