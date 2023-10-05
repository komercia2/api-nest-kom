import { HttpStatus, Inject, Query, Req, Res } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"

import { GetPaginatedProductsQuery } from "../../application/query"
import { InfrastructureInjectionTokens } from "../infrastructure-injection-tokens"

@Controller("")
export class ProductController {
	constructor(
		@Inject(InfrastructureInjectionTokens.GetPaginatedProductsQuery)
		private readonly getPaginatedProductsQuery: GetPaginatedProductsQuery
	) {}

	@Get("public/paged")
	async getPaginatedProducts(
		@Req() _req: Request,
		@Res() res: Response,
		@Query("page") page: number,
		@Query("limit") limit: number,
		@Query("storeId") storeId: number,
		@Query("active") active: boolean,
		@Query("category") category: string,
		@Query("subcategory") subcategory: string,
		@Query("freeShipping") freeShipping: boolean,
		@Query("promotion") promotion: boolean,
		@Query("max-price") maxPrice: number,
		@Query("min-price") minPrice: number
	) {
		try {
			const products = await this.getPaginatedProductsQuery.execute({
				storeId,
				page,
				limit,
				active,
				category,
				subcategory,
				freeShipping,
				promotion,
				maxPrice,
				minPrice
			})
			const { count, publicProductList } = products

			handlerHttpResponse(res, {
				data: { publicProductList, page, limit, count },
				message: "Paginated products",
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			console.log(error)
			handlerHttpResponse(res, {
				data: null,
				message: "Error getting paginated products",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}
}
