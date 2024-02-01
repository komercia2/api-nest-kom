import { Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LaravelAuthMiddleware } from "@shared/infrastructure/middlewares/auth"
import { SubscriptionCoupon, Tiendas } from "src/entities"

import { CouponsController } from "./coupons.controller"
import { CouponsService } from "./coupons.service"

@Module({
	imports: [TypeOrmModule.forFeature([SubscriptionCoupon, Tiendas])],
	controllers: [CouponsController],
	providers: [CouponsService],
	exports: [CouponsService]
})
export class CouponsModule implements NestModule {
	configure(consumer: import("@nestjs/common").MiddlewareConsumer) {
		consumer.apply(LaravelAuthMiddleware).forRoutes(CouponsController)
	}
}
