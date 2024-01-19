import { Body, HttpStatus, Inject, Param, Query, Req, Res } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"

import {
	GetManyByIdsQuery,
	GetPaginatedProductsQuery,
	GetProductBySlugQuery
} from "../../application/query"
import { GetManyProductsByIdsDto } from "../dtos"
import { InfrastructureInjectionTokens } from "../infrastructure-injection-tokens"

@ApiTags("Products")
@Controller("")
export class ProductController {
	constructor(
		@Inject(InfrastructureInjectionTokens.GetPaginatedProductsQuery)
		private readonly getPaginatedProductsQuery: GetPaginatedProductsQuery,

		@Inject(InfrastructureInjectionTokens.GetProductBySlugQuery)
		private readonly getProductBySlugQuery: GetProductBySlugQuery,

		@Inject(InfrastructureInjectionTokens.GetManyByIdsQuery)
		private readonly getManyByIdsQuery: GetManyByIdsQuery
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
		@Query("variants") withVariants: boolean,
		@Query("top-sales") topSales: boolean,
		@Query("favorite") favorite: number,
		@Query("alphabetic") alphabetic: "ASC" | "DESC",
		@Query("price") price: "ASC" | "DESC"
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
				withVariants,
				topSales,
				alphabetic,
				favorite,
				price
			})
			const { count, publicProductList, priceLimit, priceMinimum } = products

			if (!publicProductList.length) {
				handlerHttpResponse(res, {
					data: null,
					message: "No products found",
					statusCode: HttpStatus.NO_CONTENT,
					success: true
				})
				return
			}

			handlerHttpResponse(res, {
				data: { publicProductList, page, limit, count, priceLimit, priceMinimum },
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
			handlerHttpResponse(res, {
				data: null,
				message: "Error getting product by id",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}

	@Get("public/checkout/many")
	async getManyByIds(
		@Req() _req: Request,
		@Res() res: Response,
		@Body() boody: GetManyProductsByIdsDto
	) {
		const { ids, storeId } = boody

		try {
			const products = await this.getManyByIdsQuery.execute(storeId, ids as number[])

			handlerHttpResponse(res, {
				data: products,
				message: "Products found",
				statusCode: HttpStatus.OK,
				success: true
			})
			return
		} catch (error) {
			console.log(error)
			handlerHttpResponse(res, {
				data: null,
				message: "Error getting products by ids",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}
}
