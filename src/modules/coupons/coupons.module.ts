import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LaravelAuthMiddleware } from "@shared/infrastructure/middlewares/auth"
import { StoresCouponsPlus, SubscriptionCoupon, Tiendas, Users } from "src/entities"

import { CheckoutDiscountCouponsController } from "./checkout-discount-coupons.controller"
import { CouponsController } from "./coupons.controller"
import { CouponsService } from "./coupons.service"
import { CouponsPlusService } from "./coupons-plus.service"
import { DiscountCouponsController } from "./discount-coupons.controller"

@Module({
	imports: [TypeOrmModule.forFeature([SubscriptionCoupon, Tiendas, StoresCouponsPlus, Users])],
	controllers: [CouponsController, DiscountCouponsController, CheckoutDiscountCouponsController],
	providers: [CouponsService, CouponsPlusService],
	exports: [CouponsService]
})
export class CouponsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LaravelAuthMiddleware).forRoutes(CouponsController, DiscountCouponsController)
	}
}
