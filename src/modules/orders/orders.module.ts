import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import {
	Carritos,
	Clientes,
	MensajeOrden,
	Productos,
	ProductosCarritos,
	ProductosInfo,
	ProductosVariantes,
	ProductosVariantesCombinaciones,
	Users
} from "src/entities"

import { OrdersController } from "./orders.controller"
import { OrdersService } from "./orders.service"

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Carritos,
			Productos,
			ProductosVariantes,
			ProductosVariantesCombinaciones,
			ProductosInfo,
			ProductosCarritos,
			MensajeOrden,
			Users,
			Clientes
		])
	],
	controllers: [OrdersController],
	providers: [OrdersService]
})
export class OrdersModule {}
