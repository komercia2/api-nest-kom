import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LaravelAuthMiddleware } from "@shared/infrastructure/middlewares/auth"
import { PusherNotificationsService } from "@shared/infrastructure/services"
import { ApisConexiones, Carritos, StoreAddiCredentials } from "src/entities"

import { AddiService } from "./addi.service"
import { PaymentGateawaysController } from "./payment-gateaways.controller"
import { AddiUtils } from "./utils/addi-utils"

@Module({
	imports: [TypeOrmModule.forFeature([StoreAddiCredentials, ApisConexiones, Carritos])],
	controllers: [PaymentGateawaysController],
	providers: [AddiService, AddiUtils, PusherNotificationsService]
})
export class PaymentGateawaysModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LaravelAuthMiddleware)
			.exclude({
				method: RequestMethod.GET,
				path: "v1/payment-gateaways/addi/auth/credentials/:storeId"
			})
			.exclude({
				method: RequestMethod.POST,
				path: "v1/payment-gateaways/addi/auth/oauth/staging"
			})
			.exclude({
				method: RequestMethod.POST,
				path: "v1/payment-gateaways/addi/application"
			})
			.forRoutes(PaymentGateawaysController)
	}
}
