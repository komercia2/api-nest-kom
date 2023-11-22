import { Controller, Get, Inject, Query, Req, Res } from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { GetStoreTemplateSettingsDTO } from "@templates/application/query/store-template-settings/dtos"
import { GetStoreTemplateQuery } from "@templates/application/query/store-template-settings/get-template-setting-query"
import { HttpStatusCode } from "axios"
import { Request, Response } from "express"

import { InfrastructureInjectionTokens } from "../infrastructure-injection.tokens"

@Controller("store-template-settings")
export class PublicStoreTemplateSettingsController {
	constructor(
		@Inject(InfrastructureInjectionTokens.GetStoreTemplateQuery)
		private readonly getStoreTemplateQuery: GetStoreTemplateQuery
	) {}

	@Get()
	async getStoreTemplateSettings(
		@Req() _req: Request,
		@Query() params: GetStoreTemplateSettingsDTO,
		@Res() res: Response
	) {
		try {
			const settings = await this.getStoreTemplateQuery.execute(params)

			return handlerHttpResponse(res, {
				data: settings,
				message: "Store template settings retrieved successfully",
				statusCode: HttpStatusCode.Ok,
				success: true
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error retrieving store template settings",
				statusCode: HttpStatusCode.InternalServerError,
				success: false
			})
		}
	}
}
