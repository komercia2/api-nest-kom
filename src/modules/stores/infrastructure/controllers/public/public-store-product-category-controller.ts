import { HttpStatus, Inject, Req, Res } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import { GetStoreProductCategoriesQuery } from "src/modules/stores/application/query"

import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@ApiTags("Stores")
@Controller("products-categories")
export class PublicStoreProductCategoryController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.GetStoreProductCategoriesQuery)
		private readonly getStoreInfoQuery: GetStoreProductCategoriesQuery
	) {}

	@Get("/:storeId")
	async getStoreProductCategories(@Req() req: Request, @Res() res: Response) {
		try {
			const storeId = Number(req.params.storeId)
			const storeProductCategories = await this.getStoreInfoQuery.execute(storeId)

			return handlerHttpResponse(res, {
				data: storeProductCategories,
				message: "Store product categories fetched successfully",
				success: true,
				statusCode: HttpStatus.OK
			})
		} catch (error) {
			console.log(error)
			return handlerHttpResponse(res, {
				data: null,
				message: "Error fetching external apis for store",
				success: false,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}
}
