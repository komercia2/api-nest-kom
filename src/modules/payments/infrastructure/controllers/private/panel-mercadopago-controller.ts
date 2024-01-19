import { Body, Get, Inject, Post } from "@nestjs/common"
import { Req, Res } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { HttpStatusCode } from "axios"
import { Request, Response } from "express"
import { CreateIntegrationCommand } from "src/modules/payments/application/command"
import { GetIntegrationStatus } from "src/modules/payments/application/query"

import { CreateIntegrationDTO } from "../../dtos/mercadopago-dtos"
import { PaymentsInfrastructureInjectionTokens } from "../../payments-infrastructure-injection-token"

@ApiTags("Payments")
@Controller("panel/mercadopago")
export class PanelMercadopagoController {
	constructor(
		@Inject(PaymentsInfrastructureInjectionTokens.CreateIntegrationCommand)
		private readonly createIntegrationCommand: CreateIntegrationCommand,

		@Inject(PaymentsInfrastructureInjectionTokens.GetIntegrationStatus)
		private readonly getIntegrationStatus: GetIntegrationStatus
	) {}

	@Post()
	async createIntegration(
		@Req() req: Request,
		@Res() res: Response,
		@Body() body: CreateIntegrationDTO
	) {
		try {
			const { id } = req

			const integration = await this.createIntegrationCommand.execute(Number(req.id), {
				...body,
				idTienda: Number(id)
			})

			if (!integration) {
				return handlerHttpResponse(res, {
					data: null,
					message: "Integration not synced successfully",
					statusCode: HttpStatusCode.InternalServerError,
					success: false
				})
			}

			return handlerHttpResponse(res, {
				data: integration,
				message: "Integration created has been synced successfully",
				statusCode: HttpStatusCode.Created,
				success: true
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Internal server error",
				statusCode: HttpStatusCode.InternalServerError,
				success: false
			})
		}
	}

	@Get("status")
	async status(@Req() req: Request, @Res() res: Response) {
		try {
			const { id } = req

			const status = await this.getIntegrationStatus.execute(Number(id))

			if (!status) {
				return handlerHttpResponse(res, {
					data: null,
					message: "Integration status not found. Store not integrated",
					statusCode: HttpStatusCode.NotFound,
					success: false
				})
			}

			return handlerHttpResponse(res, {
				data: status,
				message: "Integration status fetched successfully",
				statusCode: HttpStatusCode.Ok,
				success: true
			})
		} catch (error) {
			console.log(error)
			return handlerHttpResponse(res, {
				data: null,
				message: "Internal server error",
				statusCode: HttpStatusCode.InternalServerError,
				success: false
			})
		}
	}
}
