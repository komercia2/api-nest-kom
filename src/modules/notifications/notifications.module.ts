import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LaravelAuthMiddleware } from "@shared/infrastructure/middlewares/auth"
import { StoreNotification } from "src/entities"

import { NotificationsController } from "./notifications.controller"
import { NotificationsService } from "./notifications.service"

@Module({
	imports: [TypeOrmModule.forFeature([StoreNotification])],
	controllers: [NotificationsController],
	providers: [NotificationsService],
	exports: [NotificationsService]
})
export class NotificationsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LaravelAuthMiddleware).forRoutes(NotificationsController)
	}
}
