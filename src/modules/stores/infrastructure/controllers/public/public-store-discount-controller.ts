import { HttpStatus, Inject, Req, Res } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"

import { GetStoreDiscountsQuery } from "../../../application/query"
import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@ApiTags("Stores")
@Controller("discounts")
export class PublicStoreDiscountController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.GetStoreDiscountsQuery)
		private readonly getStoreDiscountsQuery: GetStoreDiscountsQuery
	) {}

	@Get("/:storeId")
	async getAllCities(@Req() req: Request, @Res() res: Response) {
		try {
			const storeId = Number(req.params.storeId)
			const storeDiscounts = await this.getStoreDiscountsQuery.execute(storeId)
			return handlerHttpResponse(res, {
				data: storeDiscounts,
				message: "External Apis for store fetched successfully",
				success: true,
				statusCode: HttpStatus.OK
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error fetching external apis for store",
				success: false,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}
}
