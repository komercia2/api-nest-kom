export enum StoresInfrastructureInjectionTokens {
	/**
	 * Infrastructure services
	 */
	MySQLStoreExternalApiService = "MySQLStoreExternalApiService",
	MySQLStoreDiscountService = "MySQLStoreDiscountService",
	MySQLStoreBlogService = "MySQLStoreBlogService",
	MySQLStoreCustomerAccessCodeService = "MySQLStoreCustomerAccessCodeService",

	/**
	 * Use cases (queries)
	 */
	GetStoreExternalApisQuery = "GetStoreExternalApisQuery",
	GetStoreDiscountsQuery = "GetStoreDiscountsQuery",
	GetPagedStoreBlogsQuery = "GetPagedStoreBlogsQuery",
	GetStoreBlogByIdQuery = "GetStoreBlogByIdQuery",
	CheckWithoutAuthQuery = "CheckWithoutAuthQuery"
}
