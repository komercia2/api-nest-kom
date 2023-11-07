import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import {
	ApisConexiones,
	Banners,
	CategoriaProductos,
	CustomerAccessCode,
	DescuentoRango,
	Geolocalizacion,
	Politicas,
	Subcategorias,
	TiendaBlogs,
	Tiendas,
	WhatsappCheckout
} from "src/entities"

import {
	CheckWithoutAuthQuery,
	GetPagedStoreBlogsQuery,
	GetStoreBannersQuery,
	GetStoreBlogByIdQuery,
	GetStoreDiscountsQuery,
	GetStoreExternalApisQuery,
	GetStoreGeolocationsQuery,
	GetStoreInfoQuery,
	GetStorePoliciesQuery,
	GetStoreProductCategoriesQuery,
	GetStoreProductSubcategoriesQuery,
	GetStoreWhatsAppCheckoutQuery
} from "./application/query"
import { StoresApplicationInjectionTokens } from "./application/stores-application-injection-tokens"
import {
	PublicStoreBannerController,
	PublicStoreBlogController,
	PublicStoreDiscountController,
	PublicStoreExternalApiController,
	PublicStoreGeolocationController,
	PublicStorePoliciesController,
	PublicStoreProductCategoryController,
	PublicStoreProductSubcategoryController,
	PublicStoreWhatsappCheckoutController
} from "./infrastructure/controllers/public"
import { PublicStoreCustomerAccessCodeController } from "./infrastructure/controllers/public/public-store-cutomer-access-code-controller"
import { PublicStoreInfoController } from "./infrastructure/controllers/public/public-store-info-controller"
import {
	MySQLStoreBannerRepository,
	MySQLStoreBlogRepository,
	MySQLStoreDiscountRepository,
	MySQLStoreExternalApiRepository,
	MySQLStoreGeolocationRepository,
	MySQLStoreInfoRepository,
	MySQLStorePoliciesRepository,
	MySQLStoreWhatsappCheckoutRepository
} from "./infrastructure/repositories"
import { MySQLStoreCustomerAccessCodeRepository } from "./infrastructure/repositories/mysq-store-customer-repository"
import { MySQLStoreProductCategoryRepository } from "./infrastructure/repositories/mysq-store-product-category-repository"
import { MysqlStoreProductSubcategoryRepository } from "./infrastructure/repositories/mysql-store-subcategory-repository"
import {
	MySQLStoreBannerService,
	MySQLStoreBlogService,
	MySQLStoreCustomerAccessCodeService,
	MySQLStoreDiscountService,
	MySQLStoreExternalApiService,
	MySQLStoreGeolocationService,
	MySQLStoreInfoService,
	MySQLStorePoliciesService,
	MySQLStoreProductCategoryService,
	MysqlStoreProductSubcategoryService,
	MySQLStoreWhatsappCheckoutService
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
			Subcategorias,
			Geolocalizacion,
			Politicas,
			Banners,
			WhatsappCheckout
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
		PublicStoreWhatsappCheckoutController
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
				PublicStoreProductSubcategoryController,
				PublicStoreGeolocationController,
				PublicStorePoliciesController,
				PublicStoreBannerController,
				PublicStoreWhatsappCheckoutController
			)
	}
}
