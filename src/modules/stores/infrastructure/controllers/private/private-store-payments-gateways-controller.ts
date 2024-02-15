import { Body, Controller, Get, Inject, Put, Query, Req, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import { ChangePaymentGatewayStatusCommand } from "src/modules/stores/application/command"
import { UpdatePaymentGatewayCommand } from "src/modules/stores/application/command/update-payment-gateway-command"
import { FindPaymentMethodWithCredentialsQuery } from "src/modules/stores/application/query"
import { ChangePaymentGatewayStatus } from "src/modules/stores/domain/dtos/change-payment-gateway-status.dto"
import { FindPaymentMethodWithCredentialsDto } from "src/modules/stores/domain/dtos/find-payment-method-with-credentials-dto"
import { StorePaymentGateWay } from "src/modules/stores/domain/types/store-payment-gateways-type"

import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@ApiTags("Stores")
@Controller("private/payment-gateways")
export class PrivateStorePaymentGatewaysController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.FindPaymentMethodWithCredentialsQuery)
		private readonly findPaymentMethoFdWithCredentialsQuery: FindPaymentMethodWithCredentialsQuery,

		@Inject(StoresInfrastructureInjectionTokens.DeactivatePaymentGatewayCommand)
		private readonly deactivatePaymentGatewayCommand: ChangePaymentGatewayStatusCommand,

		@Inject(StoresInfrastructureInjectionTokens.UpdatePaymentGatewayCommand)
		private readonly updatePaymentGatewayCommand: UpdatePaymentGatewayCommand
	) {}

	@Put("dynamic-update/:storeId")
	update(
		@Req() req: Request,
		@Res() res: Response,
		@Query() query: FindPaymentMethodWithCredentialsDto,
		@Body() body: StorePaymentGateWay
	) {
		const { storeId } = req.params

		this.updatePaymentGatewayCommand
			.execute(+storeId, query, body)
			.then((resp) => {
				return handlerHttpResponse(res, {
					message: "Payment method updated",
					statusCode: 200,
					data: resp,
					success: true
				})
			})
			.catch(() => {
				return handlerHttpResponse(res, {
					message: "Error while updating payment method",
					statusCode: 500,
					data: null,
					success: false
				})
			})
	}

	@Put("dynamic-status/:id")
	deactivate(
		@Req() req: Request,
		@Res() res: Response,
		@Query() query: ChangePaymentGatewayStatus
	) {
		const { id } = req.params

		this.deactivatePaymentGatewayCommand
			.execute(+id, query)
			.then((resp) => {
				return handlerHttpResponse(res, {
					message: "Payment method deactivated",
					statusCode: 200,
					data: resp,
					success: true
				})
			})
			.catch(() => {
				return handlerHttpResponse(res, {
					message: "Error while deactivating payment method",
					statusCode: 500,
					data: null,
					success: false
				})
			})
	}

	@Get("checkout/:id")
	getPublic(
		@Req() req: Request,
		@Res() res: Response,
		@Query() query: FindPaymentMethodWithCredentialsDto
	) {
		const { id } = req.params

		this.findPaymentMethoFdWithCredentialsQuery
			.execute(+id, query)
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

	@Get()
	getPaymentMethods(
		@Req() req: Request,
		@Res() res: Response,
		@Query() query: FindPaymentMethodWithCredentialsDto
	) {
		const { id } = req

		this.findPaymentMethoFdWithCredentialsQuery
			.execute(+id, query)
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
