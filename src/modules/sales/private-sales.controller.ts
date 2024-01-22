import { Controller, Get, Query } from "@nestjs/common"

import { FilterSalesDto } from "./dtos/filter-sales.dto"
import { SalesService } from "./sales.service"

@Controller("admin")
export class PrivateSalesController {
	constructor(private readonly salesService: SalesService) {}

	@Get()
	async getFilteredSales(@Query() filter: FilterSalesDto) {
		return await this.salesService.getFilteredSales(filter)
	}
}
