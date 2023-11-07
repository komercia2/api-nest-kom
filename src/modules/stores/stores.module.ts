import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import {
	ApisConexiones,
	CategoriaProductos,
	CustomerAccessCode,
	DescuentoRango,
	Subcategorias,
	TiendaBlogs,
	Tiendas
} from "src/entities"

import {
	CheckWithoutAuthQuery,
	GetPagedStoreBlogsQuery,
	GetStoreBlogByIdQuery,
	GetStoreDiscountsQuery,
	GetStoreExternalApisQuery,
	GetStoreInfoQuery,
	GetStoreProductCategoriesQuery,
	GetStoreProductSubcategoriesQuery
} from "./application/query"
import { StoresApplicationInjectionTokens } from "./application/stores-application-injection-tokens"
import {
	PublicStoreBlogController,
	PublicStoreDiscountController,
	PublicStoreExternalApiController,
	PublicStoreProductCategoryController,
	PublicStoreProductSubcategoryController
} from "./infrastructure/controllers/public"
import { PublicStoreCustomerAccessCodeController } from "./infrastructure/controllers/public/public-store-cutomer-access-code-controller"
import { PublicStoreInfoController } from "./infrastructure/controllers/public/public-store-info-controller"
import {
	MySQLStoreBlogRepository,
	MySQLStoreDiscountRepository,
	MySQLStoreExternalApiRepository,
	MySQLStoreInfoRepository
} from "./infrastructure/repositories"
import { MySQLStoreCustomerAccessCodeRepository } from "./infrastructure/repositories/mysq-store-customer-repository"
import { MySQLStoreProductCategoryRepository } from "./infrastructure/repositories/mysq-store-product-category-repository"
import { MysqlStoreProductSubcategoryRepository } from "./infrastructure/repositories/mysql-store-subcategory-repository"
import {
	MySQLStoreBlogService,
	MySQLStoreCustomerAccessCodeService,
	MySQLStoreDiscountService,
	MySQLStoreExternalApiService,
	MySQLStoreInfoService,
	MySQLStoreProductCategoryService,
	MysqlStoreProductSubcategoryService
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
	},
	{
		provide: StoresApplicationInjectionTokens.IStoreInfoRepository,
		useClass: MySQLStoreInfoRepository
	},
	{
		provide: StoresApplicationInjectionTokens.IStoreProductCategoryRepository,
		useClass: MySQLStoreProductCategoryRepository
	},
	{
		provide: StoresApplicationInjectionTokens.IStoreProductSubcategoryRepository,
		useClass: MysqlStoreProductSubcategoryRepository
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
		provide: StoresInfrastructureInjectionTokens.GetStoreInfoQuery,
		useClass: GetStoreInfoQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.GetStoreProductCategoriesQuery,
		useClass: GetStoreProductCategoriesQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.GetStoreProductSubcategoriesQuery,
		useClass: GetStoreProductSubcategoriesQuery
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
	},
	{
		provide: StoresInfrastructureInjectionTokens.MysqlStoreInfoService,
		useClass: MySQLStoreInfoService
	},
	{
		provide: StoresInfrastructureInjectionTokens.MySQLStoreProductCategoryService,
		useClass: MySQLStoreProductCategoryService
	},
	{
		provide: StoresInfrastructureInjectionTokens.MySQLStoreProductSubcategoryService,
		useClass: MysqlStoreProductSubcategoryService
	}
]

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ApisConexiones,
			DescuentoRango,
			TiendaBlogs,
			CustomerAccessCode,
			Tiendas,
			CategoriaProductos,
			Subcategorias
		])
	],
	controllers: [
		PublicStoreDiscountController,
		PublicStoreExternalApiController,
		PublicStoreBlogController,
		PublicStoreCustomerAccessCodeController,
		PublicStoreInfoController,
		PublicStoreProductCategoryController,
		PublicStoreProductSubcategoryController
	],
	providers: [...application, ...infrastructure]
})
export class StoresModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(PublicApiKeyAuthMiddleware)
			.forRoutes(
				PublicStoreDiscountController,
				PublicStoreExternalApiController,
				PublicStoreBlogController,
				PublicStoreCustomerAccessCodeController,
				PublicStoreInfoController,
				PublicStoreProductCategoryController,
				PublicStoreProductSubcategoryController
			)
	}
}
