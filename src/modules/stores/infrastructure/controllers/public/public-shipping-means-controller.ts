import { Controller, Get, Inject, Param, Req, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { HttpStatusCode } from "axios"
import { Request, Response } from "express"
import { GetStoreShippingMeansQuery } from "src/modules/stores/application/query"

import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@ApiTags("Stores")
@Controller("shipping-means")
export class PublicShippingMeansController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.GetStoreShippingMeansQuery)
		private readonly getStoreShippingMeansQuery: GetStoreShippingMeansQuery
	) {}

	@Get(":storeId")
	async getStoreShippingMeans(
		@Req() req: Request,
		@Res() res: Response,
		@Param("storeId") storeId: number
	) {
		try {
			const shippingMeans = await this.getStoreShippingMeansQuery.execute(storeId)

			return handlerHttpResponse(res, {
				data: shippingMeans,
				message: "Store shipping means",
				statusCode: HttpStatusCode.Ok,
				success: true
			})
		} catch (error) {
			console.log(error)
			return handlerHttpResponse(res, {
				data: null,
				message: "Error getting store shipping means",
				statusCode: HttpStatusCode.InternalServerError,
				success: false
			})
		}
	}
}
