import { Controller, Get, Inject, Param, Req, Res, UseGuards } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { CheckoutJwtGuard } from "@shared/infrastructure/guards"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { HttpStatusCode } from "axios"
import { Request, Response } from "express"
import { GetPaymentMethodsWithoutAuthQuery } from "src/modules/stores/application/query"

import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@ApiTags("Stores")
@Controller("payment-methods")
export class PublicStorePaymentMethodsController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.GetPaymentMethodsQueryWithoutAuth)
		private readonly getStorePaymentsMethodsWithoutAuthQuery: GetPaymentMethodsWithoutAuthQuery
	) {}

	@UseGuards(CheckoutJwtGuard)
	@Get(":storeId")
	async getStorePaymentsMethodsWithoutQuery(
		@Req() req: Request,
		@Res() res: Response,
		@Param("storeId") storeId: number
	) {
		try {
			const paymentMethods = await this.getStorePaymentsMethodsWithoutAuthQuery.execute(storeId)

			return handlerHttpResponse(res, {
				data: paymentMethods,
				message: "Store payment methods",
				statusCode: HttpStatusCode.Ok,
				success: true
			})
		} catch (error) {
			console.log(error)
			return handlerHttpResponse(res, {
				data: null,
				message: "Error getting store payment methods",
				statusCode: HttpStatusCode.InternalServerError,
				success: false
			})
		}
	}
}
