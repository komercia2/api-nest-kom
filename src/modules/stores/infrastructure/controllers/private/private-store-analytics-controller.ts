import { Controller, Get, Inject, Query, Req, Res } from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import { GetFilteredStoreAnalyticsQuery } from "src/modules/stores/application/query"

import { GetFilteredStoreAnalyticsDto } from "../../../domain/dtos"
import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@Controller("private/analytics")
export class PrivateStoreAnalyticsController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.GetFilteredStoreAnalyticsQuery)
		private readonly getFilteredStoreAnalyticsQuery: GetFilteredStoreAnalyticsQuery
	) {}

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
