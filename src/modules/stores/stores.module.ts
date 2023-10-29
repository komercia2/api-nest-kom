import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import { ApisConexiones, CustomerAccessCode, DescuentoRango, TiendaBlogs } from "src/entities"

import {
	CheckWithoutAuthQuery,
	GetPagedStoreBlogsQuery,
	GetStoreBlogByIdQuery,
	GetStoreDiscountsQuery,
	GetStoreExternalApisQuery
} from "./application/query"
import { StoresApplicationInjectionTokens } from "./application/stores-application-injection-tokens"
import {
	PublicStoreBlogController,
	PublicStoreDiscountController,
	PublicStoreExternalApiController
} from "./infrastructure/controllers/public"
import { PublicStoreCustomerAccessCodeController } from "./infrastructure/controllers/public/public-store-cutomer-access-code-controller"
import {
	MySQLStoreBlogRepository,
	MySQLStoreDiscountRepository,
	MySQLStoreExternalApiRepository
} from "./infrastructure/repositories"
import { MySQLStoreCustomerAccessCodeRepository } from "./infrastructure/repositories/mysq-store-customer-repository"
import {
	MySQLStoreBlogService,
	MySQLStoreCustomerAccessCodeService,
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
	},
	{
		provide: StoresApplicationInjectionTokens.IStoreCustomerAccessCodeRepository,
		useClass: MySQLStoreCustomerAccessCodeRepository
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
		provide: StoresInfrastructureInjectionTokens.GetStoreBlogByIdQuery,
		useClass: GetStoreBlogByIdQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.CheckWithoutAuthQuery,
		useClass: CheckWithoutAuthQuery
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
	},
	{
		provide: StoresInfrastructureInjectionTokens.MySQLStoreCustomerAccessCodeService,
		useClass: MySQLStoreCustomerAccessCodeService
	}
]

@Module({
	imports: [
		TypeOrmModule.forFeature([ApisConexiones, DescuentoRango, TiendaBlogs, CustomerAccessCode])
	],
	controllers: [
		PublicStoreDiscountController,
		PublicStoreExternalApiController,
		PublicStoreBlogController,
		PublicStoreCustomerAccessCodeController
	],
	providers: [...application, ...infrastructure]
})
export class StoresModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(PublicApiKeyAuthMiddleware)
			.forRoutes(PublicStoreDiscountController, PublicStoreExternalApiController, PublicStoreBlogController)
	}
}
