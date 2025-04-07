import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { NodeAuthMiddleware } from "@shared/infrastructure/middlewares/auth/node-auth-middleware"
import {
	Carritos,
	Clientes,
	DeliveryStatus,
	Geolocalizacion,
	Politicas,
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
			ProductosVariantesCombinaciones,
			Geolocalizacion,
			Politicas
		])
	],
	controllers: [PanelController],
	providers: [PanelService]
})
export class PanelModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(NodeAuthMiddleware).forRoutes(PanelController)
	}
}
