import { HttpStatus, Inject, Param, Query, Req, Res } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"

import { GetPaginatedProductsQuery, GetProductBySlugQuery } from "../../application/query"
import { InfrastructureInjectionTokens } from "../infrastructure-injection-tokens"

@Controller("")
export class ProductController {
	constructor(
		@Inject(InfrastructureInjectionTokens.GetPaginatedProductsQuery)
		private readonly getPaginatedProductsQuery: GetPaginatedProductsQuery,

		@Inject(InfrastructureInjectionTokens.GetProductBySlugQuery)
		private readonly getProductBySlugQuery: GetProductBySlugQuery
	) {}

	@Get("public/paged")
	async getPaginatedProducts(
		@Req() _req: Request,
		@Res() res: Response,
		@Query("page") page: number,
		@Query("limit") limit: number,
		@Query("name") name: string,
		@Query("storeId") storeId: number,
		@Query("active") active: boolean,
		@Query("category") category: string,
		@Query("subcategory") subcategory: string,
		@Query("freeShipping") freeShipping: boolean,
		@Query("promotion") promotion: boolean,
		@Query("max-price") maxPrice: number,
		@Query("min-price") minPrice: number,
		@Query("tag") tagPropertyId: number,
		@Query("variants") withVariants: boolean
	) {
		try {
			const products = await this.getPaginatedProductsQuery.execute({
				storeId,
				page,
				limit,
				name,
				active,
				category,
				subcategory,
				freeShipping,
				promotion,
				maxPrice,
				minPrice,
				tagPropertyId,
				withVariants
			})
			const { count, publicProductList } = products

			handlerHttpResponse(res, {
				data: { publicProductList, page, limit, count },
				message: "Paginated products",
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			handlerHttpResponse(res, {
				data: null,
				message: "Error getting paginated products",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}

	@Get("public/:slug")
	async getProductById(@Req() _req: Request, @Res() res: Response, @Param("slug") slug: string) {
		try {
			const product = await this.getProductBySlugQuery.execute(slug)

			handlerHttpResponse(res, {
				data: product,
				message: "Product found",
				statusCode: HttpStatus.OK,
				success: true
			})
			return
		} catch (error) {
			console.log(error)
			handlerHttpResponse(res, {
				data: null,
				message: "Error getting product by id",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}
}
