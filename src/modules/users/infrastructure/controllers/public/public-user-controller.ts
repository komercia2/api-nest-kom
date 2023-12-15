import { Controller, Get, HttpStatus, Inject, Param, Req, Res } from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import { GetAdressesByUserIdQuery } from "src/modules/users/application/query"

import { UsersInfrastructureInjectionTokens } from "../../users-infrastructure-injection-tokens"

@Controller("public")
export class PublicUserController {
	constructor(
		@Inject(UsersInfrastructureInjectionTokens.GetAdressesByUserIdQuery)
		private readonly getAdressesByUserIdQuery: GetAdressesByUserIdQuery
	) {}

	@Get("adresses/:userId")
	async getAdressesByUserId(
		@Req() _req: Request,
		@Res() res: Response,
		@Param("userId") userId: number
	) {
		try {
			const adresses = await this.getAdressesByUserIdQuery.execute(userId)

			return handlerHttpResponse(res, {
				data: adresses,
				message: `User adresses with id ${userId} fetched successfully`,
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error getting user adresses",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}
}
