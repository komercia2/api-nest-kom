import { HttpStatus, Inject, Req, Res } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"

import { GetStoreExternalApisQuery } from "../../../application/query"
import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@ApiTags("Stores")
@Controller("apis")
export class PublicStoreExternalApiController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.GetStoreExternalApisQuery)
		private readonly getStoreExternalApisQuery: GetStoreExternalApisQuery
	) {}

	@Get("/:storeId")
	async getAllExternalApis(@Req() req: Request, @Res() res: Response) {
		try {
			const storeId = Number(req.params.storeId)
			const storeExternalApis = await this.getStoreExternalApisQuery.execute(storeId)
			return handlerHttpResponse(res, {
				data: storeExternalApis,
				message: "External Apis for store fetched successfully",
				success: true,
				statusCode: HttpStatus.OK
			})
		} catch (error) {
			console.log(error)
			return handlerHttpResponse(res, {
				data: null,
				message: "Error fetching external apis for store",
				success: false,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}
}
