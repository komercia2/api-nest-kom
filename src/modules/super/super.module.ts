import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import {
	Carritos,
	CategoriaTiendas,
	Entidades,
	EntidadesTiendas,
	LogTiendas,
	MultipleSubscriptionCoupon,
	MultipleSubscriptionCouponToStore,
	Paises,
	Productos,
	StoreAnalytics,
	SubscriptionCoupon,
	Tiendas,
	TiendasInfo,
	TiendaSuscripcionStripe,
	TiendasUsuarios,
	Users,
	UsersInfo,
	Ventas
} from "src/entities"

import { CouponsModule } from "../coupons/coupons.module"
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
			EntidadesTiendas,
			MultipleSubscriptionCoupon,
			MultipleSubscriptionCouponToStore,
			SubscriptionCoupon,
			LogTiendas,
			TiendasUsuarios,
			UsersInfo
		])
	],
	controllers: [SuperController],
	providers: [SuperService]
})
export class SuperModule {}
