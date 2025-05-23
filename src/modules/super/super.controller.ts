import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Query,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe
} from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { SuperJwtAuthGuard } from "@shared/infrastructure/guards"
import { Request } from "express"

import { CouponsService } from "../coupons/coupons.service"
import { CreateSubscriptionCouponDto } from "../coupons/dtos/create-coupon.dto"
import { CreateMultipleSubscriptionCouponDto } from "../coupons/dtos/create-multiple-subscription-coupon.dto"
import { FilterSubscriptionCouponsDto } from "../coupons/dtos/filter-subscription-cuopons"
import { RedeemCouponDto } from "../coupons/dtos/redeem-coupon.dto"
import { RedeemMultipleSubscriptionDto } from "../coupons/dtos/redeem-multiple-subscription.dto"
import { MultipleSubscriptionCouponsService } from "../coupons/multiple-subscriptions-coupons.service"
import { PaginationDto } from "../users/infrastructure/dtos/paginatation.dto"
import {
	ChangePasswordDto,
	FilterSuscriptionDto,
	GetFilteredStoresDto,
	GetStoreAdminsDto,
	UpdateStoreDto,
	UpdateStoreEntitiesDto
} from "./dtos"
import { AssignStoreAdminDto } from "./dtos/assign-store-admin.dto"
import { DeleteStoreDto } from "./dtos/delete-store.dto"
import { DeleteUserDto } from "./dtos/delete-user.dto"
import { EditSusctiptionCouponDto } from "./dtos/edit-suscription-coupon.dto"
import { EditUserDto } from "./dtos/editUserDto"
import { FilterLogsDto } from "./dtos/filter-logs.dto"
import { FilterUsersDto } from "./dtos/filter-users.dto"
import { GetFilteredReferralsDto } from "./dtos/get-filtered-referrals.dto"
import { UnlinkStoreAdminDto } from "./dtos/unlink-store-admin.dto"
import { UpdateStorePlanDto } from "./dtos/update-store-plan.dto"
import { SuperService } from "./super.service"

@ApiTags("Super")
@Controller("")
export class SuperController {
	constructor(
		private readonly superService: SuperService,
		private readonly couponsService: CouponsService,
		private readonly multipleSubscriptionCouponsService: MultipleSubscriptionCouponsService
	) {}

	@UseGuards(SuperJwtAuthGuard)
	@Put("change-password")
	changePassword(@Body() changePasswordDto: ChangePasswordDto) {
		return this.superService.changePassword(changePasswordDto)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("referrals/:expertId")
	getStoresReferralByExpert(@Param("expertId") expertId: string) {
		return this.superService.getStoresReferralByExpert(expertId)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("referrals")
	getReferrals(@Query() paginatationDto: PaginationDto, @Query() filters: GetFilteredReferralsDto) {
		return this.superService.getReferrals(paginatationDto, filters)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Delete("user-stores/:userId/:storeId")
	removeUserAdmin(@Param("userId") userId: number, @Param("storeId") storeId: number) {
		return this.superService.removeUserAdmin(+userId, +storeId)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Post("user-stores/:userId/:storeId")
	addUserAdmin(@Param("userId") userId: number, @Param("storeId") storeId: number) {
		return this.superService.addUserAdmin(+userId, +storeId)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("user-stores/:id")
	getAdmins(@Param("id") id: number) {
		return this.superService.getStoreUsers(+id)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Delete("entities/:storeId/:entityId")
	unassignEntityToStore(@Param("storeId") storeId: number, @Param("entityId") entityId: number) {
		return this.superService.removeEntity(+storeId, +entityId)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Post("entities/:storeId/:entityId")
	assignEntityToStore(@Param("storeId") storeId: number, @Param("entityId") entityId: number) {
		return this.superService.addEntity(+storeId, +entityId)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Post("multiple-subscriptions")
	@HttpCode(HttpStatus.CREATED)
	createMultipleSubscriptionCoupons(
		@Body() createMultipleSubscriptionCouponDto: CreateMultipleSubscriptionCouponDto
	) {
		return this.multipleSubscriptionCouponsService.createCoupon(createMultipleSubscriptionCouponDto)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("logs")
	getLogs(@Query() paginationDto: PaginationDto, @Query() filterLogsDto: FilterLogsDto) {
		return this.superService.filterLogs(paginationDto, filterLogsDto)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Post("subscriptions/coupons/single")
	redeemSingleSubscriptionCoupon(@Body() redeemCouponDto: RedeemCouponDto) {
		return this.couponsService.redeemCoupon(redeemCouponDto)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Post("subscriptions/coupons/multiple")
	redeemMultipleSubscriptionCoupon(
		@Body() redeemMultipleSubscriptionDto: RedeemMultipleSubscriptionDto
	) {
		return this.multipleSubscriptionCouponsService.redeem(redeemMultipleSubscriptionDto)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Delete("subscriptions/coupons/:id")
	deleteSubscriptionCoupon(@Param("id") id: number) {
		return this.superService.deleteSuscriptionCoupon(id)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Put("subscriptions/coupons")
	updateDymicSubscriptionsCoupons(@Body() editSusctiptionCouponDto: EditSusctiptionCouponDto) {
		return this.superService.editSuscriptionCoupon(editSusctiptionCouponDto)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("subscriptions/coupons/multiple")
	getMultipleSubscriptionsCoupons(@Query() filter: FilterSubscriptionCouponsDto) {
		return this.multipleSubscriptionCouponsService.findAll(filter)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Put("stores/entities/:id")
	updateStoreEntities(
		@Param("id") id: number,
		@Req() req: Request,
		@Body() updateStoreEntitiesDto: UpdateStoreEntitiesDto
	) {
		const { superUser } = req
		return this.superService.updateStoreEntities(+id, updateStoreEntitiesDto, +superUser.id)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Delete("stores")
	deleteStore(@Body() deleteStoreDto: DeleteStoreDto) {
		return this.superService.deleteStore(deleteStoreDto)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Delete("users/:id")
	deleteUser(@Body() deleteUserDto: DeleteUserDto) {
		return this.superService.deleteUser(deleteUserDto)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Put("users")
	editPassword(@Body() editUserDto: EditUserDto) {
		return this.superService.editUser(editUserDto)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Put("stores")
	updateStore(@Req() req: Request, @Body() updateStoreDto: UpdateStoreDto) {
		const { superUser } = req
		return this.superService.updateStore(updateStoreDto, +superUser.id)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("stores/templates")
	getStoresTemplates() {
		return this.superService.getStoresTemplates()
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("stores/categories")
	getStoresCategories() {
		return this.superService.getAllStoresCategories()
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("stores/plan/:storeId")
	getStoreCurrentPlan(@Param("storeId") storeId: number) {
		return this.superService.getStoreCurrentPlan(storeId)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Put("stores/:storeId/plan")
	updateStorePlan(@Req() req: Request, @Body() updateStorePlanDto: UpdateStorePlanDto) {
		const { superUser } = req
		return this.superService.updateStorePlan(updateStorePlanDto, +superUser.id)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Put("admins/assign-store")
	assignStoreToAdmin(@Body() dto: AssignStoreAdminDto) {
		return this.superService.assignStoreAdmin(dto)
	}

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
	@Get("stores/admins")
	getStoreAdmins(@Query() getStoreAdminsDto: GetStoreAdminsDto) {
		return this.superService.getStoreAdmins(getStoreAdminsDto)
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
