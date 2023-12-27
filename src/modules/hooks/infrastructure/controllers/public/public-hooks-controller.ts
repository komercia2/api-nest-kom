import { Body, Controller, HttpStatus, Inject, Post, Req, Res } from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import { NotifyOrderCreatedQuery } from "src/modules/hooks/application/query"

import { NotifyOrderCreatedDto } from "../../dtos"
import { HooksInfrastructureInjectionTokens } from "../../hooks-infrastructure-injection-tokens"

@Controller("public")
export class PublicHooksController {
	constructor(
		@Inject(HooksInfrastructureInjectionTokens.NotifyOrderCreatedQuery)
		private readonly notifyOrderCreatedQuery: NotifyOrderCreatedQuery
	) {}

	@Post("notify-order-created")
	async notifyOrderCreated(
		@Req() req: Request,
		@Res() res: Response,
		@Body() notifyOrderCreatedDto: NotifyOrderCreatedDto
	) {
		try {
			await this.notifyOrderCreatedQuery.execute(notifyOrderCreatedDto)

			return handlerHttpResponse(res, {
				data: null,
				statusCode: HttpStatus.OK,
				message: "Store notified successfully",
				success: true
			})
		} catch (error) {
			console.log(error)
			return handlerHttpResponse(res, {
				data: null,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: "Error notifying store",
				success: false
			})
		}
	}
}
