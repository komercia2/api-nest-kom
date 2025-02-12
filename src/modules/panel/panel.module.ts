import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Productos, ProductosInfo } from "src/entities"

import { PanelController } from "./panel.controller"
import { PanelService } from "./panel.service"

@Module({
	imports: [TypeOrmModule.forFeature([Productos, ProductosInfo])],
	controllers: [PanelController],
	providers: [PanelService]
})
export class PanelModule {}
