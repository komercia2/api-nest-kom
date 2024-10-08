import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Geolocalizacion, Productos, Tiendas } from "src/entities"

import { ChatbotsService } from "./chatbot.service"
import { ChatbotsController } from "./chatbots.controller"

@Module({
	controllers: [ChatbotsController],
	providers: [ChatbotsService],
	imports: [TypeOrmModule.forFeature([Tiendas, Productos, Geolocalizacion])]
})
export class ChatbotsModule {}
