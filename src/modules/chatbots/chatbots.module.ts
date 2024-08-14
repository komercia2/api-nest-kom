import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Productos, Tiendas } from "src/entities"

import { ChatbotsService } from "./chatbot.service"
import { ChatbotsController } from "./chatbots.controller"

@Module({
	controllers: [ChatbotsController],
	providers: [ChatbotsService],
	imports: [TypeOrmModule.forFeature([Tiendas, Productos])]
})
export class ChatbotsModule {}
