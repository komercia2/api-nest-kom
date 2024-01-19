import { HttpStatus, Inject, Req, Res } from "@nestjs/common"
import { Get } from "@nestjs/common"
import { Controller } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Request, Response } from "express"
import {
	GetStoreEntityQuery,
	GetStoreInfoQuery,
	GetStoresInfoByEntityQuery
} from "src/modules/stores/application/query"

import { StoresInfrastructureInjectionTokens } from "../../store-infrastructure-injection-tokens"

@ApiTags("Stores")
@Controller("info")
export class PublicStoreInfoController {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.GetStoreInfoQuery)
		private readonly getStoreInfoQuery: GetStoreInfoQuery,

		@Inject(StoresInfrastructureInjectionTokens.GetStoresInfoByEntityQuery)
		private readonly getStoresInfoByEntityQuery: GetStoresInfoByEntityQuery,

		@Inject(StoresInfrastructureInjectionTokens.GetStoreEntityQuery)
		private readonly getStoreEntityQuery: GetStoreEntityQuery
	) {}

	@Get("/:storeId")
	async getStoreInfo(@Req() req: Request, @Res() res: Response) {
		try {
			const storeId = Number(req.params.storeId)
			const storeInfo = await this.getStoreInfoQuery.execute(storeId)

			return handlerHttpResponse(res, {
				data: storeInfo,
				message: "Store info fetched successfully",
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

	@Get("/entity/:entityId")
	async getStoresInfoByEntityId(@Req() req: Request, @Res() res: Response) {
		try {
			const entityId = Number(req.params.entityId)
			const storesInfo = await this.getStoresInfoByEntityQuery.execute(entityId)

			return handlerHttpResponse(res, {
				data: storesInfo,
				message: "Stores info fetched successfully",
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

	@Get("/my-entity/:storeId")
	async getStoreEntity(@Req() req: Request, @Res() res: Response) {
		try {
			const storeId = Number(req.params.storeId)
			const storeEntity = await this.getStoreEntityQuery.execute(storeId)

			return handlerHttpResponse(res, {
				data: storeEntity,
				message: "Store entity fetched successfully",
				success: true,
				statusCode: HttpStatus.OK
			})
		} catch (error) {
			console.log(error)
			return handlerHttpResponse(res, {
				data: null,
				message: "Error fetching store entity",
				success: false,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			})
		}
	}
}
