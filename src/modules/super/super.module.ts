import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import {
	Carritos,
	Entidades,
	Paises,
	Productos,
	StoreAnalytics,
	Tiendas,
	TiendaSuscripcionStripe,
	Users,
	Ventas
} from "src/entities"

import { SuperController } from "./super.controller"
import { SuperService } from "./super.service"

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Tiendas,
			Ventas,
			TiendaSuscripcionStripe,
			Carritos,
			Paises,
			Entidades,
			Users,
			Productos,
			StoreAnalytics
		])
	],
	controllers: [SuperController],
	providers: [SuperService]
})
export class SuperModule {}
