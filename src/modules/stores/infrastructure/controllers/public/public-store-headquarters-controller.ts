import { Controller, Get, HttpStatus, Inject, Param, Req, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import { FindStoreHeadquartersQuery } from "src/modules/stores/application/query"

import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@ApiTags("Stores")
@Controller("headquarters")
export class PublicStoreHeadquartersController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.FindStoreHeadquartersQuery)
		private readonly findStoreHeadquartersQuery: FindStoreHeadquartersQuery
	) {}

	@Get(":id")
	async findStoreHeadquarters(@Req() req: Request, @Res() res: Response, @Param("id") id: number) {
		try {
			const storeHeadquarters = await this.findStoreHeadquartersQuery.execute(id)

			return handlerHttpResponse(res, {
				data: storeHeadquarters,
				message: "Store headquarters found",
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error finding store headquarters",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}
}
