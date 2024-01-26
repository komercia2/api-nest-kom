import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Carritos, Entidades, Paises, Tiendas, TiendaSuscripcionStripe, Ventas } from "src/entities"

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
			Entidades
		])
	],
	controllers: [SuperController],
	providers: [SuperService]
})
export class SuperModule {}
