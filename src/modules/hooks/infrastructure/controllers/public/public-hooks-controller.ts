import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Inject,
	Post,
	Req,
	Res,
	UseGuards
} from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import {
	ProccessAddiApplicationStatusCommand,
	ProccessWompiPaymentStatusCommand
} from "src/modules/hooks/application/command"
import { NotifyOrderCreatedQuery } from "src/modules/hooks/application/query"
import { AddiHookEntity, WompiEntity } from "src/modules/hooks/domain/entities"

import { NotifyOrderCreatedDto } from "../../dtos"
import { AddiApplicationCallbackGuard } from "../../guard"
import { HooksInfrastructureInjectionTokens } from "../../hooks-infrastructure-injection-tokens"

@ApiTags("Hooks")
@Controller("public")
export class PublicHooksController {
	constructor(
		@Inject(HooksInfrastructureInjectionTokens.NotifyOrderCreatedQuery)
		private readonly notifyOrderCreatedQuery: NotifyOrderCreatedQuery,

		@Inject(HooksInfrastructureInjectionTokens.ProccessAddiApplicationStatusCommand)
		private readonly proccessAdiApplicationStatusCommand: ProccessAddiApplicationStatusCommand,

		@Inject(HooksInfrastructureInjectionTokens.ProccessWompiPaymentStatusCommand)
		private readonly proccessWompiPaymentStatusCommand: ProccessWompiPaymentStatusCommand
	) {}

	@Post("proccess-wompi-payment-status")
	@HttpCode(HttpStatus.OK)
	async proccessWompiPaymentStatus(@Body() wompiEvent: WompiEntity) {
		try {
			return await this.proccessWompiPaymentStatusCommand.execute(wompiEvent)
		} catch (error) {
			throw error
		}
	}

	@UseGuards(AddiApplicationCallbackGuard)
	@Post("proccess-adi-application-status")
	@HttpCode(HttpStatus.OK)
	async proccessAdiApplicationStatus(@Body() proccessAdiApp: AddiHookEntity) {
		try {
			return await this.proccessAdiApplicationStatusCommand.execute(proccessAdiApp)
		} catch (error) {
			throw error
		}
	}

	@Post("notify-order-created")
	async notifyOrderCreated(
		@Req() req: Request,
		@Res() res: Response,
		@Body() notifyOrderCreatedDto: NotifyOrderCreatedDto
	) {
		try {
			await this.notifyOrderCreatedQuery.execute(notifyOrderCreatedDto)

			return handlerHttpResponse(res, {
				data: null,
				statusCode: HttpStatus.OK,
				message: "Store notified successfully",
				success: true
			})
		} catch (error) {
			console.log(error)
			return handlerHttpResponse(res, {
				data: null,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: "Error notifying store",
				success: false
			})
		}
	}
}
