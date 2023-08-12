import { GetCitiesWithDepartamentsQuery } from "@global/application/query"
import { Controller, Get, HttpStatus, Inject, Req, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"

import { InfrastructureInjectionTokens } from "../infrastructure-injection.tokens"

/**
 * @name CityController
 *
 */
@ApiTags("Cities")
@Controller("/cities")
export class CityController {
	constructor(
		@Inject(InfrastructureInjectionTokens.GetCitiesWithDepartamentsQuery)
		private readonly getCitiesWithDepartamentsQuery: GetCitiesWithDepartamentsQuery
	) {}

	@Get()
	async getCitiesWithDepartaments(@Req() _req: Request, @Res() res: Response) {
		try {
			const cities = await this.getCitiesWithDepartamentsQuery.execute()
			handlerHttpResponse(res, {
				data: cities,
				message: "Cities with departaments",
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			handlerHttpResponse(res, {
				data: null,
				message: "Error getting cities with departaments",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}
}
