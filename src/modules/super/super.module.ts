import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import {
	Carritos,
	CategoriaTiendas,
	Entidades,
	EntidadesTiendas,
	MultipleSubscriptionCoupon,
	MultipleSubscriptionCouponToStore,
	Paises,
	Productos,
	StoreAnalytics,
	Tiendas,
	TiendasInfo,
	TiendaSuscripcionStripe,
	Users,
	Ventas
} from "src/entities"

import { CouponsModule } from "../coupons/coupons.module"
import { MultipleSubscriptionCouponsService } from "../coupons/multiple-subscriptions-coupons.service"
import { SuperController } from "./super.controller"
import { SuperService } from "./super.service"

@Module({
	imports: [
		CouponsModule,
		TypeOrmModule.forFeature([
			Tiendas,
			Ventas,
			TiendaSuscripcionStripe,
			Carritos,
			Paises,
			Entidades,
			Users,
			TiendasInfo,
			Productos,
			CategoriaTiendas,
			StoreAnalytics,
			EntidadesTiendas
		])
	],
	controllers: [SuperController],
	providers: [SuperService]
})
export class SuperModule {}
