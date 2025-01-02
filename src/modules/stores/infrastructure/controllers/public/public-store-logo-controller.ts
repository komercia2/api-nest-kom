import { Controller, Get, HttpStatus, Inject, Param, Req, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import { GetStoreLogoQuery } from "src/modules/stores/application/query/logos/get-store-logo-query"

import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@ApiTags("Stores")
@Controller("logos")
export class PublicStoreLogoController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.GetStoreLogoQuery)
		private readonly getStoreLogoQuery: GetStoreLogoQuery
	) {}

	@Get(":storeId")
	async getStoreLogoById(
		@Req() req: Request,
		@Res() res: Response,
		@Param("storeId") storeID: string
	) {
		try {
			const logo = await this.getStoreLogoQuery.execute(+storeID)

			const message = logo ? "Logo found" : "Logo not found"

			return handlerHttpResponse(res, {
				data: logo,
				message,
				success: true,
				statusCode: HttpStatus.OK
			})
		} catch (error) {
			console.log(error)
			return handlerHttpResponse(res, {
				data: null,
				message: "Error while getting store logo by id",
				success: false,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}
}
