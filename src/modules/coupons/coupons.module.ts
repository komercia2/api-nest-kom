import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LaravelAuthMiddleware } from "@shared/infrastructure/middlewares/auth"
import {
	MultipleSubscriptionCoupon,
	MultipleSubscriptionCouponToStore,
	StoresCouponsPlus,
	SubscriptionCoupon,
	Tiendas,
	Users
} from "src/entities"

import { CheckoutDiscountCouponsController } from "./checkout-discount-coupons.controller"
import { CouponsController } from "./coupons.controller"
import { CouponsService } from "./coupons.service"
import { CouponsPlusService } from "./coupons-plus.service"
import { DiscountCouponsController } from "./discount-coupons.controller"
import { MultipleSubscriptionCouponsService } from "./multiple-subscriptions-coupons.service"

@Module({
	imports: [
		TypeOrmModule.forFeature([
			SubscriptionCoupon,
			Tiendas,
			StoresCouponsPlus,
			Users,
			MultipleSubscriptionCoupon,
			MultipleSubscriptionCouponToStore
		])
	],
	controllers: [CouponsController, DiscountCouponsController, CheckoutDiscountCouponsController],
	providers: [CouponsService, CouponsPlusService, MultipleSubscriptionCouponsService],
	exports: [CouponsService, MultipleSubscriptionCouponsService]
})
export class CouponsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LaravelAuthMiddleware).forRoutes(CouponsController, DiscountCouponsController)
	}
}
