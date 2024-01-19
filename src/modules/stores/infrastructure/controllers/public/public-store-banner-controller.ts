import { HttpStatus, Inject, Req, Res } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import { GetStoreBannersQuery } from "src/modules/stores/application/query"

import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@ApiTags("Stores")
@Controller("banners")
export class PublicStoreBannerController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.GetStoreBannersQuery)
		private readonly getSoreBannersQuery: GetStoreBannersQuery
	) {}

	@Get("/:storeId")
	async getStoreBanners(@Req() req: Request, @Res() res: Response) {
		try {
			const { storeId } = req.params
			const banners = await this.getSoreBannersQuery.execute(Number(storeId))
			return handlerHttpResponse(res, {
				data: banners,
				message: "Store banners fetched successfully",
				success: true,
				statusCode: HttpStatus.OK
			})
		} catch (error) {
			console.log(error)
			return handlerHttpResponse(res, {
				data: null,
				message: "Error fetching store banners",
				success: false,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}
}
