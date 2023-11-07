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
	GetStoreProductSubcategoriesQuery = "GetStoreProductSubcategoriesQuery"
}
