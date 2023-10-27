import { HttpStatus, Inject, Query, Req, Res, UsePipes } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"

import { GetPagedStoreBlogsQuery } from "../../application/query"
import { GetPagedStoreBlogsDto, StoreBlogsFilterDTO } from "../../application/query/dtos"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

@Controller("blogs")
export class StoreBlogController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.GetPagedStoreBlogsQuery)
		private readonly getPagedStoreBlogsQuery: GetPagedStoreBlogsQuery
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
}
