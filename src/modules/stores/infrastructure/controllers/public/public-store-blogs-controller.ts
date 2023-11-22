import { HttpStatus, Inject, Query, Req, Res, UsePipes } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"

import { GetPagedStoreBlogsQuery, GetStoreBlogByIdQuery } from "../../../application/query"
import { GetPagedStoreBlogsDto, StoreBlogsFilterDTO } from "../../../application/query/dtos"
import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@Controller("blogs")
export class PublicStoreBlogController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.GetPagedStoreBlogsQuery)
		private readonly getPagedStoreBlogsQuery: GetPagedStoreBlogsQuery,

		@Inject(StoresInfrastructureInjectionTokens.GetStoreBlogByIdQuery)
		private readonly getStoreBlogByIdQuery: GetStoreBlogByIdQuery
	) {}

	@Get("/:storeId")
	@UsePipes(GetPagedStoreBlogsDto)
	async getPagedBlogs(
		@Req() req: Request,
		@Query() query: GetPagedStoreBlogsDto,
		@Query() filter: StoreBlogsFilterDTO,
		@Res() res: Response
	) {
		try {
			const storeId = Number(req.params.storeId)
			const pagedStoreBlogs = await this.getPagedStoreBlogsQuery.execute(storeId, query, filter)

			return handlerHttpResponse(res, {
				data: pagedStoreBlogs,
				message: "Store blogs fetched successfully",
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

	@Get("/:storeId/:storeBlogId")
	async getStoreBlogById(@Req() req: Request, @Res() res: Response) {
		try {
			const storeId = Number(req.params.storeId)
			const storeBlogId = Number(req.params.storeBlogId)
			const storeBlog = await this.getStoreBlogByIdQuery.execute(storeId, storeBlogId)

			return handlerHttpResponse(res, {
				data: storeBlog,
				message: "Store blog fetched successfully",
				success: true,
				statusCode: HttpStatus.OK
			})
		} catch (error) {
			handlerHttpResponse(res, {
				data: null,
				message: "Error fetching store blog",
				success: false,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}
}
