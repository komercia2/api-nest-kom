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
	Tiendas,
	TiendasInfo,
	Users
} from "src/entities"
import { StoreNotification } from "src/entities/StoreNotifications"

import { MailsModule } from "../mails/mails.module"
import { OrdersController } from "./orders.controller"
import { OrdersService } from "./orders.service"

@Module({
	imports: [
		MailsModule,
		TypeOrmModule.forFeature([
			Carritos,
			Productos,
			ProductosVariantes,
			ProductosVariantesCombinaciones,
			ProductosInfo,
			Tiendas,
			ProductosCarritos,
			TiendasInfo,
			MensajeOrden,
			Users,
			Clientes,
			StoreNotification
		])
	],
	controllers: [OrdersController],
	providers: [OrdersService]
})
export class OrdersModule {}
