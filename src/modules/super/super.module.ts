import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Carritos, SuscriptoresTienda, Tiendas, Ventas } from "src/entities"

import { SuperController } from "./super.controller"
import { SuperService } from "./super.service"

@Module({
	imports: [TypeOrmModule.forFeature([Tiendas, Ventas, SuscriptoresTienda, Carritos])],
	controllers: [SuperController],
	providers: [SuperService]
})
export class SuperModule {}
