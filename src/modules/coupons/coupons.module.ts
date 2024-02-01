import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { SubscriptionCoupon, Tiendas } from "src/entities"

import { CouponsController } from "./coupons.controller"
import { CouponsService } from "./coupons.service"

@Module({
	imports: [TypeOrmModule.forFeature([SubscriptionCoupon, Tiendas])],
	controllers: [CouponsController],
	providers: [CouponsService]
})
export class CouponsModule {}
