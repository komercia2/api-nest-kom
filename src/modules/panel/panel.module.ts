import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { NodeAuthMiddleware } from "@shared/infrastructure/middlewares/auth/node-auth-middleware"
import {
	Bancos,
	Carritos,
	CategoriaProductos,
	Clientes,
	Cupones,
	CustomerAccessCode,
	DeliveryStatus,
	DescuentoRango,
	DisenoModal,
	Geolocalizacion,
	MensajesContacto,
	Politicas,
	Productos,
	ProductosInfo,
	ProductosVariantesCombinaciones,
	Redes,
	Subcategorias,
	SuscriptoresTienda,
	TemplateWhatsappSettings,
	TiendaBlogs,
	Users,
	WhatsappCheckout
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
			Politicas,
			Redes,
			CategoriaProductos,
			Subcategorias,
			WhatsappCheckout,
			TemplateWhatsappSettings,
			Cupones,
			DisenoModal,
			DescuentoRango,
			CustomerAccessCode,
			SuscriptoresTienda,
			MensajesContacto,
			TiendaBlogs,
			Users,
			Bancos
		])
	],
	controllers: [PanelController],
	providers: [PanelService]
})
export class PanelModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		// consumer.apply(NodeAuthMiddleware).forRoutes(PanelController)
	}
}
