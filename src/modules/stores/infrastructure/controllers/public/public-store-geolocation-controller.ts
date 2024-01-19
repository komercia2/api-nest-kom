import { HttpStatus, Inject, Req, Res } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import { GetStoreGeolocationsQuery } from "src/modules/stores/application/query"

import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@ApiTags("Stores")
@Controller("geolocations")
export class PublicStoreGeolocationController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.GetStoreGeolocationsQuery)
		private readonly getStoreGeolocationsQuery: GetStoreGeolocationsQuery
	) {}

	@Get("/:storeId")
	async getStoreGeolocations(@Req() req: Request, @Res() res: Response) {
		try {
			const storeId = Number(req.params.storeId)
			const geolocations = await this.getStoreGeolocationsQuery.execute(storeId)
			return handlerHttpResponse(res, {
				data: geolocations,
				message: "Geolocations found",
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Internal server error",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}
}
