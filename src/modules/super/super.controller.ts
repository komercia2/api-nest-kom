import { Controller, Get, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common"
import { SuperJwtAuthGuard } from "@shared/infrastructure/guards"

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
	getWeeklyStores() {
		return this.superService.getWeeklyStores()
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("stores")
	@UsePipes(new ValidationPipe({ transform: true }))
	getFilteredStores(@Query() getFilteredStoresDto: GetFilteredStoresDto) {
		return this.superService.getFilteredStores(getFilteredStoresDto)
	}
}
