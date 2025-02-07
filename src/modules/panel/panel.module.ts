import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Productos } from "src/entities"

import { PanelController } from "./panel.controller"
import { PanelService } from "./panel.service"

@Module({
	imports: [TypeOrmModule.forFeature([Productos])],
	controllers: [PanelController],
	providers: [PanelService]
})
export class PanelModule {}
