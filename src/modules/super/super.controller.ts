import { Controller, Get, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common"
import { SuperJwtAuthGuard } from "@shared/infrastructure/guards"

import { PaginationDto } from "../users/infrastructure/dtos/paginatation.dto"
import { GetFilteredStoresDto } from "./dtos"
import { SuperService } from "./super.service"

@Controller("")
export class SuperController {
	constructor(private readonly superService: SuperService) {}

	@UseGuards(SuperJwtAuthGuard)
	@Get("general-stats")
	getWeeklyGeneralStats() {
		return this.superService.getWeeklyGeneralStats()
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("weekly-stores")
	getWeeklyStores(@Query() paginationDto: PaginationDto) {
		return this.superService.getPagedWeeklyStores(paginationDto)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("stores")
	@UsePipes(new ValidationPipe({ transform: true }))
	getFilteredStores(@Query() getFilteredStoresDto: GetFilteredStoresDto) {
		return this.superService.getFilteredStores(getFilteredStoresDto)
	}
}
