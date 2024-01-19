import { Controller, Get, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { SuperJwtAuthGuard } from "@shared/infrastructure/guards"

import { PaginationDto } from "../users/infrastructure/dtos/paginatation.dto"
import { GetFilteredStoresDto } from "./dtos"
import { SuperService } from "./super.service"

@ApiTags("Super")
@Controller("")
export class SuperController {
	constructor(private readonly superService: SuperService) {}

	@UseGuards(SuperJwtAuthGuard)
	@Get("monthly-subscriptions")
	getWeeklySubscriptions(@Query() paginationDto: PaginationDto) {
		return this.superService.getMonthlySubscriptions(paginationDto)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("general-stats")
	getWeeklyGeneralStats() {
		return this.superService.getMonthlyGeneralStats()
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("monthly-stores")
	getWeeklyStores(@Query() paginationDto: PaginationDto) {
		return this.superService.getPagedMonthlyStores(paginationDto)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("stores")
	@UsePipes(new ValidationPipe({ transform: true }))
	getFilteredStores(@Query() getFilteredStoresDto: GetFilteredStoresDto) {
		return this.superService.getFilteredStores(getFilteredStoresDto)
	}
}
