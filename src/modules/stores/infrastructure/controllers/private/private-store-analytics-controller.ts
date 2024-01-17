import { Controller, Get, Inject, Query, Req, Res } from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import {
	CountDevicesQuery,
	GetAllEventsCountQuery,
	GetFilteredStoreAnalyticsQuery
} from "src/modules/stores/application/query"

import { GetFilteredStoreAnalyticsDto } from "../../../domain/dtos"
import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@Controller("private/analytics")
export class PrivateStoreAnalyticsController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.GetFilteredStoreAnalyticsQuery)
		private readonly getFilteredStoreAnalyticsQuery: GetFilteredStoreAnalyticsQuery,

		@Inject(StoresInfrastructureInjectionTokens.GetAllEventsCountQuery)
		private readonly getAllEventsCountQuery: GetAllEventsCountQuery,

		@Inject(StoresInfrastructureInjectionTokens.CountAllDevicesQuery)
		private readonly countAllDevicesQuery: CountDevicesQuery
	) {}

	@Get("devices-count")
	getAllDevicesCount(@Req() req: Request, @Res() res: Response) {
		const id = +req.id

		try {
			this.countAllDevicesQuery.execute(id).then((data) => {
				return handlerHttpResponse(res, {
					data,
					message: "Devices count retrieved successfully",
					statusCode: 200,
					success: true
				})
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error retrieving devices count",
				statusCode: 500,
				success: false
			})
		}
	}

	@Get("events-count")
	getAllEventsCount(@Req() req: Request, @Res() res: Response) {
		const id = +req.id

		try {
			this.getAllEventsCountQuery.execute(id).then((data) => {
				return handlerHttpResponse(res, {
					data,
					message: "Events count retrieved successfully",
					statusCode: 200,
					success: true
				})
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error retrieving events count",
				statusCode: 500,
				success: false
			})
		}
	}

	@Get()
	getFilteredStoreAnalytics(
		@Req() req: Request,
		@Query() query: GetFilteredStoreAnalyticsDto,
		@Res() res: Response
	) {
		const id = +req.id

		try {
			this.getFilteredStoreAnalyticsQuery.execute(id, query).then((data) => {
				return handlerHttpResponse(res, {
					data,
					message: "Store analytics retrieved successfully",
					statusCode: 200,
					success: true
				})
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error retrieving store analytics",
				statusCode: 500,
				success: false
			})
		}
	}
}
