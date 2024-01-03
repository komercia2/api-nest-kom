import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LaravelAuthMiddleware } from "@shared/infrastructure/middlewares/auth"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import {
	ApisConexiones,
	Banners,
	CategoriaProductos,
	CustomerAccessCode,
	DescuentoRango,
	Entidades,
	EntidadesTiendas,
	Geolocalizacion,
	MediosEnvios,
	Politicas,
	StoreAnalytics,
	Subcategorias,
	TiendaBlogs,
	Tiendas,
	WhatsappCheckout
} from "src/entities"

import { SaveStoreAnalyticCommand } from "./application/command"
import {
	CheckWithoutAuthQuery,
	FindStoreHeadquartersQuery,
	GetAllEventsCountQuery,
	GetFilteredStoreAnalyticsQuery,
	GetPagedStoreBlogsQuery,
	GetStoreBannersQuery,
	GetStoreBlogByIdQuery,
	GetStoreDiscountsQuery,
	GetStoreEntitiesQuery,
	GetStoreEntityQuery,
	GetStoreExternalApisQuery,
	GetStoreGeolocationsQuery,
	GetStoreInfoQuery,
	GetStorePoliciesQuery,
	GetStoreProductCategoriesQuery,
	GetStoreProductSubcategoriesQuery,
	GetStoreShippingMeansQuery,
	GetStoresInfoByEntityQuery,
	GetStoreWhatsAppCheckoutQuery
} from "./application/query"
import { StoresApplicationInjectionTokens } from "./application/stores-application-injection-tokens"
import { PrivateStoreAnalyticsController } from "./infrastructure/controllers/private"
import {
	PublicShippingMeansController,
	PublicStoreBannerController,
	PublicStoreBlogController,
	PublicStoreDiscountController,
	PublicStoreEntitiesController,
	PublicStoreExternalApiController,
	PublicStoreGeolocationController,
	PublicStoreHeadquartersController,
	PublicStorePoliciesController,
	PublicStoreProductCategoryController,
	PublicStoreProductSubcategoryController,
	PublicStoreWhatsappCheckoutController
} from "./infrastructure/controllers/public"
import { PublicStoreAnalyticsController } from "./infrastructure/controllers/public/public-store-analytics-controller"
import { PublicStoreCustomerAccessCodeController } from "./infrastructure/controllers/public/public-store-cutomer-access-code-controller"
import { PublicStoreInfoController } from "./infrastructure/controllers/public/public-store-info-controller"
import {
	MySQLStoreAnalyticsRepository,
	MySQLStoreBannerRepository,
	MySQLStoreBlogRepository,
	MySQLStoreDiscountRepository,
	MySQLStoreEntitiesRepository,
	MySQLStoreExternalApiRepository,
	MySQLStoreGeolocationRepository,
	MySQLStoreHeadquartersRepository,
	MySQLStoreInfoRepository,
	MySQLStorePoliciesRepository,
	MySQLStoreWhatsappCheckoutRepository
} from "./infrastructure/repositories"
import { MySQLStoreCustomerAccessCodeRepository } from "./infrastructure/repositories/mysq-store-customer-repository"
import { MySQLStoreProductCategoryRepository } from "./infrastructure/repositories/mysq-store-product-category-repository"
import { MySQLStoreShippingMeansRepository } from "./infrastructure/repositories/mysql-store-shipping-means-repository"
import { MysqlStoreProductSubcategoryRepository } from "./infrastructure/repositories/mysql-store-subcategory-repository"
import {
	MySQLStoreAnalyticsService,
	MySQLStoreBannerService,
	MySQLStoreBlogService,
	MySQLStoreCustomerAccessCodeService,
	MySQLStoreDiscountService,
	MySQLStoreEntitiesService,
	MySQLStoreExternalApiService,
	MySQLStoreGeolocationService,
	MySQLStoreHeadquartersService,
	MySQLStoreInfoService,
	MySQLStorePoliciesService,
	MySQLStoreProductCategoryService,
	MysqlStoreProductSubcategoryService,
	MySQLStoreWhatsappCheckoutService
} from "./infrastructure/services"
import { MysqlStoreShippingMeansService } from "./infrastructure/services/mysql-store-shipping-means-service"
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
	},
	{
		provide: StoresApplicationInjectionTokens.IStoreGeolocationRepository,
		useClass: MySQLStoreGeolocationRepository
	},
	{
		provide: StoresApplicationInjectionTokens.IStorePoliciesRepository,
		useClass: MySQLStorePoliciesRepository
	},
	{
		provide: StoresApplicationInjectionTokens.IStoreBannerRepository,
		useClass: MySQLStoreBannerRepository
	},
	{
		provide: StoresApplicationInjectionTokens.IStoreWhatsAppCheckoutRepository,
		useClass: MySQLStoreWhatsappCheckoutRepository
	},
	{
		provide: StoresApplicationInjectionTokens.IStoreEntitiesRepository,
		useClass: MySQLStoreEntitiesRepository
	},
	{
		provide: StoresApplicationInjectionTokens.IStoreHeadquartersRepository,
		useClass: MySQLStoreHeadquartersRepository
	},
	{
		provide: StoresApplicationInjectionTokens.IStoreShippingMeansRepository,
		useClass: MySQLStoreShippingMeansRepository
	},
	{
		provide: StoresApplicationInjectionTokens.IStoreAnalyticsRepository,
		useClass: MySQLStoreAnalyticsRepository
	}
]

const infrastructure = [
	{
		provide: StoresInfrastructureInjectionTokens.GetAllEventsCountQuery,
		useClass: GetAllEventsCountQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.GetFilteredStoreAnalyticsQuery,
		useClass: GetFilteredStoreAnalyticsQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.SaveStoreAnalyticCommand,
		useClass: SaveStoreAnalyticCommand
	},
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
		provide: StoresInfrastructureInjectionTokens.GetStoreGeolocationsQuery,
		useClass: GetStoreGeolocationsQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.GetStorePoliciesQuery,
		useClass: GetStorePoliciesQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.GetStoreBannersQuery,
		useClass: GetStoreBannersQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.GetStoreWhatsAppCheckoutQuery,
		useClass: GetStoreWhatsAppCheckoutQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.GetStoreEntitiesQuery,
		useClass: GetStoreEntitiesQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.GetStoresInfoByEntityQuery,
		useClass: GetStoresInfoByEntityQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.GetStoreEntityQuery,
		useClass: GetStoreEntityQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.FindStoreHeadquartersQuery,
		useClass: FindStoreHeadquartersQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.GetStoreShippingMeansQuery,
		useClass: GetStoreShippingMeansQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.MySQLStoreHeadquartersService,
		useClass: MySQLStoreHeadquartersService
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
	},
	{
		provide: StoresInfrastructureInjectionTokens.MySQLStoreGeolocationService,
		useClass: MySQLStoreGeolocationService
	},
	{
		provide: StoresInfrastructureInjectionTokens.MySQLStorePoliciesService,
		useClass: MySQLStorePoliciesService
	},
	{
		provide: StoresInfrastructureInjectionTokens.MySQLStoreBannerService,
		useClass: MySQLStoreBannerService
	},
	{
		provide: StoresInfrastructureInjectionTokens.MySQLStoreWhatsAppCheckoutService,
		useClass: MySQLStoreWhatsappCheckoutService
	},
	{
		provide: StoresInfrastructureInjectionTokens.MysqlStoreEntitiesService,
		useClass: MySQLStoreEntitiesService
	},
	{
		provide: StoresInfrastructureInjectionTokens.MySQLStoreShippingMeansService,
		useClass: MysqlStoreShippingMeansService
	},
	{
		provide: StoresInfrastructureInjectionTokens.MySQLStoreAnalyticsService,
		useClass: MySQLStoreAnalyticsService
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
			StoreAnalytics,
			Subcategorias,
			Geolocalizacion,
			Politicas,
			Banners,
			WhatsappCheckout,
			Entidades,
			EntidadesTiendas,
			Geolocalizacion,
			MediosEnvios
		])
	],
	controllers: [
		PublicStoreDiscountController,
		PublicStoreExternalApiController,
		PublicStoreBlogController,
		PublicStoreCustomerAccessCodeController,
		PublicStoreInfoController,
		PublicStoreProductCategoryController,
		PublicStoreProductSubcategoryController,
		PublicStoreGeolocationController,
		PublicStorePoliciesController,
		PublicStoreBannerController,
		PublicStoreWhatsappCheckoutController,
		PublicStoreEntitiesController,
		PublicStoreHeadquartersController,
		PublicShippingMeansController,
		PublicStoreAnalyticsController,
		PrivateStoreAnalyticsController
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
				PublicStoreAnalyticsController,
				PublicStoreProductCategoryController,
				PublicStoreProductSubcategoryController,
				PublicStoreGeolocationController,
				PublicStorePoliciesController,
				PublicStoreBannerController,
				PublicStoreWhatsappCheckoutController,
				PublicStoreEntitiesController,
				PublicStoreHeadquartersController,
				PublicShippingMeansController
			)
			.apply(LaravelAuthMiddleware)
			.forRoutes(PrivateStoreAnalyticsController)
	}
}
