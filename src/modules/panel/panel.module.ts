import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import {
	Carritos,
	Clientes,
	DeliveryStatus,
	Productos,
	ProductosInfo,
	ProductosVariantesCombinaciones
} from "src/entities"

import { PanelController } from "./panel.controller"
import { PanelService } from "./panel.service"

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Productos,
			ProductosInfo,
			DeliveryStatus,
			Carritos,
			Clientes,
			ProductosVariantesCombinaciones
		])
	],
	controllers: [PanelController],
	providers: [PanelService]
})
export class PanelModule {}
