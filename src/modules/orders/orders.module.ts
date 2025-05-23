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
	TiendaPayuInfo,
	Tiendas,
	TiendasInfo,
	Users
} from "src/entities"
import { StoreNotification } from "src/entities/StoreNotifications"

import { MailsModule } from "../mails/mails.module"
import { WhatsappModule } from "../whatsapp/whatsapp.module"
import { OrdersController } from "./orders.controller"
import { OrdersService } from "./orders.service"

@Module({
	imports: [
		MailsModule,
		WhatsappModule,
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
			StoreNotification,
			MensajeOrden,
			TiendaPayuInfo
		])
	],
	controllers: [OrdersController],
	providers: [OrdersService]
})
export class OrdersModule {}
