import { HttpStatus, Inject, Query, Req, Res } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"

import { CheckWithoutAuthQuery } from "../../application/query"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

@Controller("access-code")
export class StoreCustomerAccessCodeController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.CheckWithoutAuthQuery)
		private readonly checkWithoutAuthQuery: CheckWithoutAuthQuery
	) {}

	@Get("verify/:storeId")
	async getStoreBlogById(@Req() req: Request, @Query("code") code: string, @Res() res: Response) {
		try {
			const storeId = Number(req.params.storeId)
			const isAccessCodeValid = await this.checkWithoutAuthQuery.execute(storeId, code)
			const message = isAccessCodeValid ? "Access code is valid" : "Access code is invalid"

			return handlerHttpResponse(res, {
				data: isAccessCodeValid,
				message,
				success: true,
				statusCode: HttpStatus.OK
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error while getting store blog by id",
				success: false,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}
}
