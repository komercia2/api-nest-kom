import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
	UsePipes,
	ValidationPipe
} from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { SuperJwtAuthGuard } from "@shared/infrastructure/guards"

import { CouponsService } from "../coupons/coupons.service"
import { CreateSubscriptionCouponDto } from "../coupons/dtos/create-coupon.dto"
import { FilterSubscriptionCouponsDto } from "../coupons/dtos/filter-subscription-cuopons"
import { PaginationDto } from "../users/infrastructure/dtos/paginatation.dto"
import { FilterSuscriptionDto, GetFilteredStoresDto } from "./dtos"
import { FilterUsersDto } from "./dtos/filter-users.dto"
import { UnlinkStoreAdminDto } from "./dtos/unlink-store-admin.dto"
import { SuperService } from "./super.service"

@ApiTags("Super")
@Controller("")
export class SuperController {
	constructor(
		private readonly superService: SuperService,
		private readonly couponsService: CouponsService
	) {}

	@UseGuards(SuperJwtAuthGuard)
	@Get("subscriptions/coupons")
	getFilteredSubscriptionsCoupons(@Query() filter: FilterSubscriptionCouponsDto) {
		return this.couponsService.getFilteresCoupons(filter)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Post("/subscriptions/coupons")
	@HttpCode(HttpStatus.CREATED)
	createSubscriptionCoupon(@Body() createCouponDto: CreateSubscriptionCouponDto) {
		return this.couponsService.createCoupons(createCouponDto)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Put("admins/unlink-store")
	unlinkStoreAdmin(@Body() unlinkStoreAdminDto: UnlinkStoreAdminDto) {
		return this.superService.unlinkStoreAdmin(unlinkStoreAdminDto)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("stores/:storeId/admins")
	getStoreAdmins(@Param("storeId") storeId: number) {
		return this.superService.getStoreAdmins(storeId)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("stores/:storeId")
	getStoreInfo(@Param("storeId") storeId: number) {
		return this.superService.getStoreInfo(storeId)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("stores/:storeId/analytics-summary")
	getStoreAnalyticsSummary(@Param("id") storeId: number) {
		return this.superService.getStoreAnalyticsSummary(storeId)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("users")
	getUsers(@Query() filterUsersDto: FilterUsersDto) {
		return this.superService.getUsers(filterUsersDto)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("suscriptions")
	getSuscriptions(@Query() filterSuscriptionDto: FilterSuscriptionDto) {
		return this.superService.getSuscriptions(filterSuscriptionDto)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("entities")
	getAvaibleEntities() {
		return this.superService.getAvaibleEntities()
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("countries")
	getCountries() {
		return this.superService.getCountries()
	}

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
