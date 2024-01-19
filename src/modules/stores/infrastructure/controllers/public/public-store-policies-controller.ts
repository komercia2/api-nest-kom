import { HttpStatus, Inject, Req, Res } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import { GetStorePoliciesQuery } from "src/modules/stores/application/query"

import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@ApiTags("Stores")
@Controller("policies")
export class PublicStorePoliciesController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.GetStorePoliciesQuery)
		private readonly getStorePoliciesQuery: GetStorePoliciesQuery
	) {}

	@Get("/:storeId")
	async getStorePolicies(@Req() req: Request, @Res() res: Response) {
		try {
			const { storeId } = req.params
			const policies = await this.getStorePoliciesQuery.execute(Number(storeId))
			return handlerHttpResponse(res, {
				data: policies,
				message: "Policies fetched successfully",
				success: true,
				statusCode: HttpStatus.OK
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Internal server error",
				success: false,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}
}
