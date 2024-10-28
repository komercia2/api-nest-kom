import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import { PusherNotificationsService } from "@shared/infrastructure/services"
import { Carritos, TiendaWompiInfo } from "src/entities"

import { NotificationsModule } from "../notifications/notifications.module"
import {
	ProccessAddiApplicationStatusCommand,
	ProccessWompiPaymentStatusCommand
} from "./application/command"
import { HooksApplicationInjectionTokens } from "./application/hooks-application-injection-tokens"
import { NotifyOrderCreatedQuery } from "./application/query"
import { PublicHooksController } from "./infrastructure/controllers/public"
import { HooksInfrastructureInjectionTokens } from "./infrastructure/hooks-infrastructure-injection-tokens"
import { HooksRepository } from "./infrastructure/repositories"
import { OrdersService } from "./infrastructure/services/orders.service"

const application = [
	{
		provide: HooksApplicationInjectionTokens.IHookRepository,
		useClass: HooksRepository
	}
]

const infrastructure = [
	{
		provide: HooksInfrastructureInjectionTokens.PusherNotificationsService,
		useClass: PusherNotificationsService
	},
	{
		provide: HooksInfrastructureInjectionTokens.NotifyOrderCreatedQuery,
		useClass: NotifyOrderCreatedQuery
	},
	{
		provide: HooksInfrastructureInjectionTokens.ProccessAddiApplicationStatusCommand,
		useClass: ProccessAddiApplicationStatusCommand
	},
	{
		provide: HooksInfrastructureInjectionTokens.OrdersService,
		useClass: OrdersService
	},
	{
		provide: HooksInfrastructureInjectionTokens.ProccessWompiPaymentStatusCommand,
		useClass: ProccessWompiPaymentStatusCommand
	}
]

@Module({
	imports: [NotificationsModule, TypeOrmModule.forFeature([Carritos, TiendaWompiInfo])],
	controllers: [PublicHooksController],
	providers: [...application, ...infrastructure, PusherNotificationsService]
})
export class HooksModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(PublicApiKeyAuthMiddleware)
			.forRoutes({ path: "v1/hooks/public/notify-order-created", method: RequestMethod.POST })
	}
}
