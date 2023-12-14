import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import { PusherNotificationsService } from "@shared/infrastructure/services"

import { HooksApplicationInjectionTokens } from "./application/hooks-application-injection-tokens"
import { NotifyOrderCreatedQuery } from "./application/query"
import { PublicHooksController } from "./infrastructure/controllers/public"
import { HooksInfrastructureInjectionTokens } from "./infrastructure/hooks-infrastructure-injection-tokens"
import { HooksRepository } from "./infrastructure/repositories"

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
	}
]

@Module({
	imports: [],
	controllers: [PublicHooksController],
	providers: [...application, ...infrastructure]
})
export class HooksModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(PublicApiKeyAuthMiddleware)
			.forRoutes({ path: "v1/hooks/public/notify-order-created", method: RequestMethod.POST })
	}
}
