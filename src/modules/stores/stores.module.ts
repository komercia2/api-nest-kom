import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
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
	MedioPagos,
	MediosEnvios,
	Politicas,
	StoreAddiCredentials,
	StoreAnalytics,
	Subcategorias,
	TiendaBlogs,
	TiendaConsignacionInfo,
	TiendaContraentregaInfo,
	TiendaCredibancoInfo,
	TiendaDaviplataInfo,
	TiendaEfectyInfo,
	TiendaEpaycoInfo,
	TiendaFlowInfo,
	TiendaMercadoPagoInfo,
	TiendaNequiInfo,
	TiendaPaymentsway,
	TiendaPayuInfo,
	Tiendas,
	TiendaTucompraInfo,
	TiendaWepay4uInfo,
	TiendaWompiInfo,
	Users,
	WhatsappCheckout
} from "src/entities"

import {
	ChangePaymentGatewayStatusCommand,
	CreatePaymentGatewayCommand,
	SaveStoreAnalyticCommand
} from "./application/command"
import { UpdatePaymentGatewayCommand } from "./application/command/update-payment-gateway-command"
import {
	CheckWithoutAuthQuery,
	CountDevicesQuery,
	EncryptWompiIntegrityQuery,
	FindPaymentMethodWithCredentialsQuery,
	FindStoreHeadquartersQuery,
	GetAllEventsCountQuery,
	GetFilteredStoreAnalyticsQuery,
	GetPagedStoreBlogsQuery,
	GetPaymentMethodsWithoutAuthQuery,
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
import { GetStoreIntegrationsQuery } from "./application/query/get-store-integrations-query"
import { StoresApplicationInjectionTokens } from "./application/stores-application-injection-tokens"
import {
	PrivateStoreAnalyticsController,
	PrivateStoreIntegrationsController,
	PrivateStorePaymentGatewaysController
} from "./infrastructure/controllers/private"
import {
	PublicShippingMeansController,
	PublicStoreBannerController,
	PublicStoreBlogController,
	PublicStoreDiscountController,
	PublicStoreEntitiesController,
	PublicStoreExternalApiController,
	PublicStoreGeolocationController,
	PublicStoreHeadquartersController,
	PublicStorePaymentMethodsController,
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
	MySqlStoreIntegrationsRepository,
	MySQLStorePaymentMethodsRepository,
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
	MySqlStoreIntegrationsService,
	MySQLStorePaymentMethodsService,
	MySQLStorePoliciesService,
	MySQLStoreProductCategoryService,
	MysqlStoreProductSubcategoryService,
	MySQLStoreWhatsappCheckoutService
} from "./infrastructure/services"
import { MysqlStoreShippingMeansService } from "./infrastructure/services/mysql-store-shipping-means-service"
import { StoresInfrastructureInjectionTokens } from "./infrastructure/store-infrastructure-injection-tokens"

const application = [
	{
		provide: StoresApplicationInjectionTokens.IStoreIntegrationsRepository,
		useClass: MySqlStoreIntegrationsRepository
	},
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
	},
	{
		provide: StoresApplicationInjectionTokens.IStroePaymentMethodsRepository,
		useClass: MySQLStorePaymentMethodsRepository
	}
]

const infrastructure = [
	{
		provide: StoresInfrastructureInjectionTokens.GetStoreIntegrationsQuery,
		useClass: GetStoreIntegrationsQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.EncryptWompiIntegrityQuery,
		useClass: EncryptWompiIntegrityQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.CreatePaymentGatewayCommand,
		useClass: CreatePaymentGatewayCommand
	},
	{
		provide: StoresInfrastructureInjectionTokens.UpdatePaymentGatewayCommand,
		useClass: UpdatePaymentGatewayCommand
	},
	{
		provide: StoresInfrastructureInjectionTokens.DeactivatePaymentGatewayCommand,
		useClass: ChangePaymentGatewayStatusCommand
	},
	{
		provide: StoresInfrastructureInjectionTokens.FindPaymentMethodWithCredentialsQuery,
		useClass: FindPaymentMethodWithCredentialsQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.GetPaymentMethodsQueryWithoutAuth,
		useClass: GetPaymentMethodsWithoutAuthQuery
	},
	{
		provide: StoresInfrastructureInjectionTokens.CountAllDevicesQuery,
		useClass: CountDevicesQuery
	},
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
	},
	{
		provide: StoresInfrastructureInjectionTokens.MySQLStorePaymentMethodsService,
		useClass: MySQLStorePaymentMethodsService
	},
	{
		provide: StoresInfrastructureInjectionTokens.MysqlStoreIntegrationsService,
		useClass: MySqlStoreIntegrationsService
	}
]

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ApisConexiones,
			DescuentoRango,
			TiendaBlogs,
			TiendaDaviplataInfo,
			CustomerAccessCode,
			TiendaNequiInfo,
			Tiendas,
			CategoriaProductos,
			StoreAnalytics,
			Subcategorias,
			Geolocalizacion,
			Politicas,
			Banners,
			StoreAddiCredentials,
			WhatsappCheckout,
			TiendaConsignacionInfo,
			TiendaEfectyInfo,
			Entidades,
			EntidadesTiendas,
			TiendaContraentregaInfo,
			Geolocalizacion,
			MediosEnvios,
			MedioPagos,
			Users,
			TiendaMercadoPagoInfo,
			TiendaFlowInfo,
			TiendaPayuInfo,
			TiendaCredibancoInfo,
			TiendaEpaycoInfo,
			TiendaPaymentsway,
			TiendaTucompraInfo,
			TiendaWepay4uInfo,
			TiendaWompiInfo
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
		PrivateStoreAnalyticsController,
		PublicStorePaymentMethodsController,
		PrivateStorePaymentGatewaysController,
		PrivateStoreIntegrationsController
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
				PublicShippingMeansController,
				PublicStorePaymentMethodsController,
				PrivateStoreIntegrationsController
			)
			.apply(LaravelAuthMiddleware)
			.exclude({
				method: RequestMethod.GET,
				path: "v1/stores/private/payment-gateways/checkout/:id"
			})
			.forRoutes(PrivateStoreAnalyticsController, PrivateStorePaymentGatewaysController)
	}
}
