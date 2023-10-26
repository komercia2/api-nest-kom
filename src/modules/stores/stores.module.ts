import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import { ApisConexiones, DescuentoRango } from "src/entities"

import { GetStoreDiscountsQuery, GetStoreExternalApisQuery } from "./application/query"
import { StoresApplicationInjectionTokens } from "./application/stores-application-injection-tokens"
import { StoreDiscountController, StoreExternalApiController } from "./infrastructure/controllers"
import {
	MySQLStoreDiscountRepository,
	MySQLStoreExternalApiRepository
} from "./infrastructure/repositories"
import { MySQLStoreDiscountService, MySQLStoreExternalApiService } from "./infrastructure/services"
import { StoresInfrastructureInjectionTokens } from "./infrastructure/store-infrastructure-injection-tokens"

const application = [
	{
		provide: StoresApplicationInjectionTokens.IStoreExternalApiRepository,
		useClass: MySQLStoreExternalApiRepository
	},
	{
		provide: StoresApplicationInjectionTokens.IStoreDiscountRepository,
		useClass: MySQLStoreDiscountRepository
	}
]

const infrastructure = [
	{
		provide: StoresInfrastructureInjectionTokens.GetStoreExternalApisQuery,
		useClass: GetStoreExternalApisQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.GetStoreDiscountsQuery,
		useClass: GetStoreDiscountsQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.MySQLStoreExternalApiService,
		useClass: MySQLStoreExternalApiService
	},
	{
		provide: StoresInfrastructureInjectionTokens.MySQLStoreDiscountService,
		useClass: MySQLStoreDiscountService
	}
]

@Module({
	imports: [TypeOrmModule.forFeature([ApisConexiones, DescuentoRango])],
	controllers: [StoreDiscountController, StoreExternalApiController],
	providers: [...application, ...infrastructure]
})
export class StoresModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(PublicApiKeyAuthMiddleware)
			.forRoutes(StoreDiscountController, StoreExternalApiController)
	}
}
