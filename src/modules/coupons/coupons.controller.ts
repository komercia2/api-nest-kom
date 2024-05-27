import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Query } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

import { CouponsService } from "./coupons.service"
import { CreateMultipleSubscriptionCouponDto } from "./dtos/create-multiple-subscription-coupon.dto"
import { RedeemCouponDto } from "./dtos/redeem-coupon.dto"
import { MultipleSubscriptionCouponsService } from "./multiple-subscriptions-coupons.service"

@ApiTags("Coupons")
@Controller()
export class CouponsController {
	constructor(
		private readonly couponsService: CouponsService,
		private readonly multipleSubscriptionCouponsService: MultipleSubscriptionCouponsService
	) {}

	@Post("/multiple-subscriptions")
	@HttpCode(HttpStatus.CREATED)
	createMultipleSubscriptionCoupons(
		@Body() createMultipleSubscriptionCouponDto: CreateMultipleSubscriptionCouponDto
	) {
		return this.multipleSubscriptionCouponsService.createCoupon(createMultipleSubscriptionCouponDto)
	}

	@Get("check/store")
	@HttpCode(HttpStatus.OK)
	checkStore(@Query("storeId") storeId: number) {
		return this.couponsService.storeHasCoupon(storeId)
	}

	@Get("check/multiple")
	@HttpCode(HttpStatus.OK)
	checkCouponMultiple(@Query("coupon") coupon: string) {
		return this.multipleSubscriptionCouponsService.isCouponAvailable(coupon)
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
