import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LaravelAuthMiddleware } from "@shared/infrastructure/middlewares/auth"
import { Carritos } from "src/entities"

import { PrivateSalesController } from "./private-sales.controller"
import { SalesService } from "./sales.service"

@Module({
	imports: [TypeOrmModule.forFeature([Carritos])],
	controllers: [PrivateSalesController],
	providers: [SalesService]
})
export class SalesModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LaravelAuthMiddleware).forRoutes(PrivateSalesController)
	}
}
