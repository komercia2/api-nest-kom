import { Inject, Post } from "@nestjs/common"
import { Query, Req, Res } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import axios, { HttpStatusCode } from "axios"
import { Request, Response } from "express"
import { ProccessPaymentCommand } from "src/modules/payments/application/command"
import { CreateMercadopagoPreferenceQuery } from "src/modules/payments/application/query"

import { ClientMercadopagoException, MercadopagoException } from "../../errors"
import { PaymentsInfrastructureInjectionTokens } from "../../payments-infrastructure-injection-token"

@Controller("mercadopago")
export class PublicMercadopagoController {
	constructor(
		@Inject(PaymentsInfrastructureInjectionTokens.CreateMercadopagoPreferenceQuery)
		private readonly createMercadopagoPreferenceQuery: CreateMercadopagoPreferenceQuery,

		@Inject(PaymentsInfrastructureInjectionTokens.ProccessPaymentCommand)
		private readonly proccessPaymentCommand: ProccessPaymentCommand
	) {}

	@Post("create-preference")
	async createPreference(
		@Req() req: Request,
		@Res() res: Response,
		@Query("cartId") cartId: number
	) {
		try {
			const preference = await this.createMercadopagoPreferenceQuery.execute(cartId)

			if (!preference) {
				return handlerHttpResponse(res, {
					data: null,
					message: "Cart not found",
					statusCode: HttpStatusCode.NotFound,
					success: false
				})
			}

			return handlerHttpResponse(res, {
				data: preference,
				message: "Preference created successfully",
				statusCode: HttpStatusCode.Ok,
				success: true
			})
		} catch (error) {
			// console.log(error)
			if (error instanceof ClientMercadopagoException) {
				return handlerHttpResponse(res, {
					data: null,
					message: error.message,
					statusCode: HttpStatusCode.BadRequest,
					success: false
				})
			}

			if (error instanceof MercadopagoException) {
				return handlerHttpResponse(res, {
					data: null,
					message: error.message,
					statusCode: HttpStatusCode.InternalServerError,
					success: false
				})
			}

			return handlerHttpResponse(res, {
				data: null,
				message: "Internal server error",
				statusCode: HttpStatusCode.InternalServerError,
				success: false
			})
		}
	}

	/**
	 * @method webhook
	 * @description MercadoPago WebHook to receive payment status
	 */
	@Post("webhook")
	async webhook(@Req() req: Request, @Res() res: Response) {
		try {
			const agent = req.headers["user-agent"] as string

			if (!agent.includes("MercadoPago WebHook")) {
				return handlerHttpResponse(res, {
					data: null,
					message: "Unauthorized",
					statusCode: HttpStatusCode.Unauthorized,
					success: false
				})
			}

			const { data } = req.body

			const paymentId = Number(data.id)

			await this.proccessPaymentCommand.execute(paymentId)

			return handlerHttpResponse(res, {
				data: null,
				message: "Webhook received",
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

	@Post("webhook-test")
	async webhookTest(@Req() req: Request, @Res() res: Response) {
		try {
			const { data } = req.body

			const paymentId = Number(data.id)

			const { data: paymentData } = await axios.get(
				`https://api.mercadopago.com/v1/payments/${paymentId}`,
				{
					headers: {
						Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
					}
				}
			)

			console.log(paymentData)

			// await this.proccessPaymentCommand.execute(paymentId)

			return handlerHttpResponse(res, {
				data: null,
				message: "Webhook received",
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
