import { HttpStatus, Inject, Req, Res } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"

import { GetAllCitiesQuery } from "../../application/query"
import { CommonInfrastructureInjectionTokens } from "../common-infrastructure-injection-tokens"

@Controller("cities")
export class CityController {
	constructor(
		@Inject(CommonInfrastructureInjectionTokens.GetAllCitiesQuery)
		private readonly getAllCitiesQuery: GetAllCitiesQuery
	) {}

	@Get("")
	async getAllCities(@Req() _req: Request, @Res() res: Response) {
		try {
			const cities = await this.getAllCitiesQuery.execute()
			return handlerHttpResponse(res, {
				data: cities,
				message: "Cities found",
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error getting product by id",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}
}
