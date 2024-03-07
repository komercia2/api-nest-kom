import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import {
	Carritos,
	CategoriaTiendas,
	Entidades,
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
			StoreAnalytics
		])
	],
	controllers: [SuperController],
	providers: [SuperService]
})
export class SuperModule {}
