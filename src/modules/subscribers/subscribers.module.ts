import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { SuscriptoresTienda } from "src/entities"

import { SubscribersController } from "./subscribers.controller"
import { SubscribersService } from "./subscribers.service"

@Module({
	imports: [TypeOrmModule.forFeature([SuscriptoresTienda])],
	controllers: [SubscribersController],
	providers: [SubscribersService]
})
export class SubscribersModule {}
