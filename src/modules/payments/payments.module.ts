import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LaravelAuthMiddleware } from "@shared/infrastructure/middlewares/auth"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import { Carritos, TiendaMercadoPagoInfo } from "src/entities"

import { CreateIntegrationCommand, ProccessPaymentCommand } from "./application/command"
import { PaymentsApplicationInjectionToken } from "./application/payments-application-injection-token"
import { CreateMercadopagoPreferenceQuery, GetIntegrationStatus } from "./application/query"
import { PanelMercadopagoController } from "./infrastructure/controllers/private"
import { PublicMercadopagoController } from "./infrastructure/controllers/public"
import { MercadoPagoPaymentNotificationGateway } from "./infrastructure/gateways"
import { PaymentsInfrastructureInjectionTokens } from "./infrastructure/payments-infrastructure-injection-token"
import { MercadopagoRepository } from "./infrastructure/repositories"
import { MySQLMercadopagoService } from "./infrastructure/services"

const application = [
	{
		provide: PaymentsInfrastructureInjectionTokens.CreateMercadopagoPreferenceQuery,
		useClass: CreateMercadopagoPreferenceQuery
	},
	{
		provide: PaymentsInfrastructureInjectionTokens.ProccessPaymentCommand,
		useClass: ProccessPaymentCommand
	},
	{
		provide: PaymentsInfrastructureInjectionTokens.GetIntegrationStatus,
		useClass: GetIntegrationStatus
	},
	{
		provide: PaymentsInfrastructureInjectionTokens.CreateIntegrationCommand,
		useClass: CreateIntegrationCommand
	}
]

const infrastructure = [
	{
		provide: PaymentsApplicationInjectionToken.IMercadopagoRepository,
		useClass: MercadopagoRepository
	},
	{
		provide: PaymentsInfrastructureInjectionTokens.MySQLMercadopagoService,
		useClass: MySQLMercadopagoService
	}
]

@Module({
	imports: [TypeOrmModule.forFeature([Carritos, TiendaMercadoPagoInfo])],
	controllers: [PublicMercadopagoController, PanelMercadopagoController],
	providers: [...application, ...infrastructure, MercadoPagoPaymentNotificationGateway]
})
export class PaymentsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(PublicApiKeyAuthMiddleware)
			.exclude({ path: "v1/payments/mercadopago/webhook", method: RequestMethod.POST })
			.forRoutes({ path: "v1/payments/mercadopago/create-preference", method: RequestMethod.POST })
			.apply(LaravelAuthMiddleware)
			.forRoutes({ path: "v1/payments/panel/*", method: RequestMethod.ALL })
	}
}
