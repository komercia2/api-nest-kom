import { HttpStatus, Inject, Req, Res } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"

import { GetAllDepartamentsQuery } from "../../application/query"
import { CommonInfrastructureInjectionTokens } from "../common-infrastructure-injection-tokens"

@Controller("departaments")
export class DepartamentController {
	constructor(
		@Inject(CommonInfrastructureInjectionTokens.GetAllDepartamentsQuery)
		private readonly getAllDepartamentsQuery: GetAllDepartamentsQuery
	) {}

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
