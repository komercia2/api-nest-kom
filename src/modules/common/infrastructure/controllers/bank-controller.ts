import { HttpStatus, Inject, Query, Req, Res } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"

import { GetAllBanksByCountryQuery } from "../../application/query"
import { CommonInfrastructureInjectionTokens } from "../common-infrastructure-injection-tokens"

@ApiTags("Common")
@Controller("banks")
export class PublicBanksController {
	constructor(
		@Inject(CommonInfrastructureInjectionTokens.GetAllBanksByCountryQuery)
		private readonly getAllBanksByCountryQuery: GetAllBanksByCountryQuery
	) {}

	@Get()
	async getBankByCountry(
		@Req() _req: Request,
		@Res() res: Response,
		@Query("countryId") countryId: number
	) {
		try {
			const banks = await this.getAllBanksByCountryQuery.execute(countryId)

			return handlerHttpResponse(res, {
				data: banks,
				message: "Banks found",
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error getting banks",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}
}
