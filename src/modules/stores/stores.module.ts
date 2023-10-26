import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import { ApisConexiones, DescuentoRango, TiendaBlogs } from "src/entities"

import {
	GetPagedStoreBlogsQuery,
	GetStoreDiscountsQuery,
	GetStoreExternalApisQuery
} from "./application/query"
import { StoresApplicationInjectionTokens } from "./application/stores-application-injection-tokens"
import {
	StoreBlogController,
	StoreDiscountController,
	StoreExternalApiController
} from "./infrastructure/controllers"
import {
	MySQLStoreBlogRepository,
	MySQLStoreDiscountRepository,
	MySQLStoreExternalApiRepository
} from "./infrastructure/repositories"
import {
	MySQLStoreBlogService,
	MySQLStoreDiscountService,
	MySQLStoreExternalApiService
} from "./infrastructure/services"
import { StoresInfrastructureInjectionTokens } from "./infrastructure/store-infrastructure-injection-tokens"

const application = [
	{
		provide: StoresApplicationInjectionTokens.IStoreExternalApiRepository,
		useClass: MySQLStoreExternalApiRepository
	},
	{
		provide: StoresApplicationInjectionTokens.IStoreDiscountRepository,
		useClass: MySQLStoreDiscountRepository
	},
	{
		provide: StoresApplicationInjectionTokens.IStoreBlogRepository,
		useClass: MySQLStoreBlogRepository
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
		provide: StoresInfrastructureInjectionTokens.GetPagedStoreBlogsQuery,
		useClass: GetPagedStoreBlogsQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.MySQLStoreExternalApiService,
		useClass: MySQLStoreExternalApiService
	},
	{
		provide: StoresInfrastructureInjectionTokens.MySQLStoreDiscountService,
		useClass: MySQLStoreDiscountService
	},
	{
		provide: StoresInfrastructureInjectionTokens.MySQLStoreBlogService,
		useClass: MySQLStoreBlogService
	}
]

@Module({
	imports: [TypeOrmModule.forFeature([ApisConexiones, DescuentoRango, TiendaBlogs])],
	controllers: [StoreDiscountController, StoreExternalApiController, StoreBlogController],
	providers: [...application, ...infrastructure]
})
export class StoresModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(PublicApiKeyAuthMiddleware)
			.forRoutes(StoreDiscountController, StoreExternalApiController, StoreBlogController)
	}
}
