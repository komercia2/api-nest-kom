import { Controller, Get, Query } from "@nestjs/common"

import { FilterSalesDto } from "./dtos/filter-sales.dto"
import { FilterTotalSalesDto } from "./dtos/filter-total-sales.dto"
import { SalesService } from "./sales.service"

@Controller("admin")
export class PrivateSalesController {
	constructor(private readonly salesService: SalesService) {}

	@Get("total-sales/cash")
	async getSales(@Query() filter: FilterTotalSalesDto) {
		return await this.salesService.getTotalSales(filter)
	}

	@Get()
	async getFilteredSales(@Query() filter: FilterSalesDto) {
		return await this.salesService.getFilteredSales(filter)
	}
}
