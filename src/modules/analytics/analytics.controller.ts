import { Controller, Get, Param, Query } from "@nestjs/common"

import { PaginationDto } from "../users/infrastructure/dtos/paginatation.dto"
import { AnalyticsService } from "./analytics.service"
import { FilterProductAnalyticsDto } from "./dto/filter-product-analytics.dto"
import { GetEventHistoryDto } from "./dto/get-event-history.dto"

@Controller("analytics")
export class AnalyticsController {
	constructor(private readonly analyticsService: AnalyticsService) {}

	@Get("/:storeId/history")
	getEventHistory(@Param("storeId") storeId: number, @Query() filters: GetEventHistoryDto) {
		return this.analyticsService.getEventHistory(+storeId, filters)
	}

	@Get("/:storeId/clients/top-ten")
	getClientsTopTen(@Param("storeId") storeId: number) {
		return this.analyticsService.getClientsTopTen(+storeId)
	}

	@Get("/:storeId/products")
	getProductsAnalytics(
		@Param("storeId") storeId: number,
		@Query() filters: FilterProductAnalyticsDto,
		@Query() paginationDto: PaginationDto
	) {
		return this.analyticsService.getProductsAnalytics(+storeId, filters, paginationDto)
	}

	@Get("/:storeId/categories/top-ten")
	getCategoriesTopTen(@Param("storeId") storeId: number) {
		return this.analyticsService.getCategoriesTopTen(+storeId)
	}

	@Get("/:storeId/products/top-ten")
	getProductTopTen(@Param("storeId") storeId: number) {
		return this.analyticsService.getProductTopTen(+storeId)
	}
}
