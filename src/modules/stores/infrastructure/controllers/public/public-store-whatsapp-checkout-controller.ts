import { HttpStatus, Inject, Req, Res } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import { GetStoreWhatsAppCheckoutQuery } from "src/modules/stores/application/query"

import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@ApiTags("Stores")
@Controller("whatsapp-checkout")
export class PublicStoreWhatsappCheckoutController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.GetStoreWhatsAppCheckoutQuery)
		private readonly getStoreWhatsAppCheckoutQuery: GetStoreWhatsAppCheckoutQuery
	) {}

	@Get("/:storeId")
	async getStoreWhatsappCheckout(@Req() req: Request, @Res() res: Response) {
		try {
			const { storeId } = req.params
			const storeWhatsAppCheckout = await this.getStoreWhatsAppCheckoutQuery.execute(
				Number(storeId)
			)
			return handlerHttpResponse(res, {
				data: storeWhatsAppCheckout,
				message: "Store whatsapp checkout fetched successfully",
				success: true,
				statusCode: HttpStatus.OK
			})
		} catch (error) {
			console.log(error)
			return handlerHttpResponse(res, {
				data: null,
				message: "Error fetching store whatsapp checkout",
				success: false,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}
}
