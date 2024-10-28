import { Body, Controller, Inject, Post, Req, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import {
	SaveClickedPayCartCommand,
	SaveStoreAnalyticCommand
} from "src/modules/stores/application/command"

import { CreateStoreAnalyticsDto } from "../../../domain/dtos"
import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@ApiTags("Stores")
@Controller("analytics")
export class PublicStoreAnalyticsController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.SaveStoreAnalyticCommand)
		private readonly saveStoreAnalyticsQuery: SaveStoreAnalyticCommand,

		@Inject(StoresInfrastructureInjectionTokens.SaveClickedPayCartCommand)
		private readonly saveClickedPayCartCommand: SaveClickedPayCartCommand
	) {}

	@Post("clicked-pay-cart")
	saveClickedPayCart(
		@Req() req: Request,
		@Body() body: { ids: [{ productId: number; units: number }]; storeId: number },
		@Res() res: Response
	) {
		const device = req.headers["user-agent"]

		const data = { ...body, device }

		try {
			this.saveClickedPayCartCommand.execute(data.ids, data.storeId).then(() => {
				return handlerHttpResponse(res, {
					data: null,
					message: "Clicked pay cart saved successfully",
					statusCode: 201,
					success: true
				})
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error saving clicked pay cart",
				statusCode: 400,
				success: false
			})
		}
	}

	@Post()
	saveStoreAnalytics(
		@Req() req: Request,
		@Body() body: CreateStoreAnalyticsDto,
		@Res() res: Response
	) {
		const device = req.headers["user-agent"]

		const data = { ...body, device }

		try {
			this.saveStoreAnalyticsQuery.execute(data).then(() => {
				return handlerHttpResponse(res, {
					data: null,
					message: "Store analytics saved successfully",
					statusCode: 201,
					success: true
				})
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error saving store analytics",
				statusCode: 400,
				success: false
			})
		}
	}
}
