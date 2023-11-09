export enum StoresInfrastructureInjectionTokens {
	/**
	 * Infrastructure services
	 */
	MySQLStoreExternalApiService = "MySQLStoreExternalApiService",
	MySQLStoreDiscountService = "MySQLStoreDiscountService",
	MySQLStoreBlogService = "MySQLStoreBlogService",
	MySQLStoreCustomerAccessCodeService = "MySQLStoreCustomerAccessCodeService",
	MysqlStoreInfoService = "MysqlStoreInfoService",
	MySQLStoreProductCategoryService = "MySQLStoreProductCategoryService",
	MySQLStoreProductSubcategoryService = "MySQLStoreProductSubcategoryService",
	MySQLStoreGeolocationService = "MySQLStoreGeolocationService",
	MySQLStorePoliciesService = "MySQLStorePoliciesService",
	MySQLStoreBannerService = "MySQLStoreBannerService",
	MySQLStoreWhatsAppCheckoutService = "MySQLStoreWhatsAppCheckoutService",
	MysqlStoreEntitiesService = "MysqlStoreEntitiesService",

	/**
	 * Use cases (queries)
	 */
	GetStoreExternalApisQuery = "GetStoreExternalApisQuery",
	GetStoreDiscountsQuery = "GetStoreDiscountsQuery",
	GetPagedStoreBlogsQuery = "GetPagedStoreBlogsQuery",
	GetStoreBlogByIdQuery = "GetStoreBlogByIdQuery",
	CheckWithoutAuthQuery = "CheckWithoutAuthQuery",
	GetStoreInfoQuery = "GetStoreInfoQuery",
	GetStoreProductCategoriesQuery = "GetStoreProductCategoriesQuery",
	GetStoreProductSubcategoriesQuery = "GetStoreProductSubcategoriesQuery",
	GetStoreGeolocationsQuery = "GetStoreGeolocationsQuery",
	GetStorePoliciesQuery = "GetStorePoliciesQuery",
	GetStoreBannersQuery = "GetStoreBannersQuery",
	GetStoreWhatsAppCheckoutQuery = "GetStoreWhatsAppCheckoutQuery",
	GetStoreEntitiesQuery = "GetStoreEntitiesQuery",
	GetStoresInfoByEntityQuery = "GetStoresInfoByEntityQuery"
}
