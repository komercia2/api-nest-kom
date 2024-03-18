import { HttpStatus, Inject, Req, Res } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"

import { GetAllDepartamentsQuery } from "../../application/query"
import { GetDepartamentsByCountryQuery } from "../../application/query/get-departaments-by-country-query"
import { CommonInfrastructureInjectionTokens } from "../common-infrastructure-injection-tokens"

@ApiTags("Common")
@Controller("departaments")
export class DepartamentController {
	constructor(
		@Inject(CommonInfrastructureInjectionTokens.GetAllDepartamentsQuery)
		private readonly getAllDepartamentsQuery: GetAllDepartamentsQuery,

		@Inject(CommonInfrastructureInjectionTokens.GetDepartamentsByCountryQuery)
		private readonly getDepartamentsByCountryQuery: GetDepartamentsByCountryQuery
	) {}

	@Get("by-country/:countryId")
	async getDepartamentsByCountry(@Req() req: Request, @Res() res: Response) {
		try {
			const countryId = Number(req.params.countryId)
			const departaments = await this.getDepartamentsByCountryQuery.execute(countryId)
			return handlerHttpResponse(res, {
				data: departaments,
				message: "Departaments found",
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error getting departaments",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}

	@Get()
	async getAllDepartaments(@Req() _req: Request, @Res() res: Response) {
		try {
			const departaments = await this.getAllDepartamentsQuery.execute()
			return handlerHttpResponse(res, {
				data: departaments,
				message: "Departaments found",
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error getting departaments",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}
}
