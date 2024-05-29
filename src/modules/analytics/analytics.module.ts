import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import { Carritos, Productos, StoreAnalytics } from "src/entities"

import { AnalyticsController } from "./analytics.controller"
import { AnalyticsService } from "./analytics.service"

@Module({
	imports: [TypeOrmModule.forFeature([StoreAnalytics, Carritos, Productos])],
	controllers: [AnalyticsController],
	providers: [AnalyticsService]
})
export class AnalyticsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(PublicApiKeyAuthMiddleware).forRoutes(AnalyticsController)
	}
}
