import { Body, Controller, Get, Inject, Req, Res } from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import { FindPaymentMethodWithCredentialsQuery } from "src/modules/stores/application/query"
import { FindPaymentMethodWithCredentialsDto } from "src/modules/stores/domain/dtos/find-payment-method-with-credentials-dto"

import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@Controller("private/payment-gateways")
export class PrivateStorePaymentGatewaysController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.FindPaymentMethodWithCredentialsQuery)
		private readonly findPaymentMethoFdWithCredentialsQuery: FindPaymentMethodWithCredentialsQuery
	) {}

	@Get()
	getPaymentMethods(
		@Req() req: Request,
		@Res() res: Response,
		@Body() body: FindPaymentMethodWithCredentialsDto
	) {
		const { id } = req

		this.findPaymentMethoFdWithCredentialsQuery
			.execute(+id, body)
			.then((resp) => {
				return handlerHttpResponse(res, {
					message: "Payment method found",
					statusCode: 200,
					data: resp,
					success: true
				})
			})
			.catch(() => {
				return handlerHttpResponse(res, {
					message: "Error while getting payment method",
					statusCode: 500,
					data: null,
					success: false
				})
			})
	}
}
