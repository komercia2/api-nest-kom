import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { StoreNotification } from "src/entities"

import { NotificationsController } from "./notifications.controller"
import { NotificationsService } from "./notifications.service"

@Module({
	imports: [TypeOrmModule.forFeature([StoreNotification])],
	controllers: [NotificationsController],
	providers: [NotificationsService],
	exports: [NotificationsService]
})
export class NotificationsModule {}
