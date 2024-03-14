import { Controller, Get, Inject, Param, Query, Req, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import { GetStoreIntegrationsQuery } from "src/modules/stores/application/query/get-store-integrations-query"

import { GetFilteredStoreAnalyticsDto } from "../../../domain/dtos"
import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@ApiTags("Stores Integrations")
@Controller("private/integrations")
export class PrivateStoreIntegrationsController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.GetStoreIntegrationsQuery)
		private readonly getStoreIntegrationsQuery: GetStoreIntegrationsQuery
	) {}

	@Get(":id")
	async getStoreIntegrations(@Req() req: Request, @Res() res: Response, @Param("id") id: number) {
		try {
			const data = await this.getStoreIntegrationsQuery.execute(id)

			return handlerHttpResponse(res, {
				data,
				message: "Store integrations retrieved successfully",
				statusCode: 200,
				success: true
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error retrieving store integrations",
				statusCode: 500,
				success: false
			})
		}
	}
}
