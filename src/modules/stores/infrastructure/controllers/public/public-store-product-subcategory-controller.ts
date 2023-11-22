import { HttpStatus, Inject, Req, Res } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import { GetStoreProductSubcategoriesQuery } from "src/modules/stores/application/query"

import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@Controller("products-subcategories")
export class PublicStoreProductSubcategoryController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.GetStoreProductSubcategoriesQuery)
		private readonly getStoreProductSubcategoriesQuery: GetStoreProductSubcategoriesQuery
	) {}

	@Get("/:storeId")
	async getStoreProductSubcategories(@Req() req: Request, @Res() res: Response) {
		try {
			const { storeId } = req.params
			const storeProductSubcategories = await this.getStoreProductSubcategoriesQuery.execute(
				parseInt(storeId)
			)
			return handlerHttpResponse(res, {
				data: storeProductSubcategories,
				message: "Store product subcategories fetched successfully",
				success: true,
				statusCode: HttpStatus.OK
			})
		} catch (error) {
			return handlerHttpResponse(res, {
				data: null,
				message: "Error fetching store product subcategories",
				success: false,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}
}
