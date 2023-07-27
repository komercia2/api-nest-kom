import { Body, Controller, HttpStatus, Inject, Post, Res, UsePipes } from "@nestjs/common"
import { ApiBody, ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Response } from "express"

import { getProductDescriptionSuggestionsFromKeywordsQuery } from "../../application/query"
import { GetDescriptionSuggetionDto } from "../../application/query/dtos"
import { InfrastructureInjectionTokens } from "../infrastructure-injection.token"

@ApiTags("AI Product Suggetions")
@Controller("products")
export class ProductSuggetionsController {
	constructor(
		@Inject(InfrastructureInjectionTokens.getProductDescriptionSuggestionsFromKeywordsQuery)
		private readonly GetProductDescriptionSuggestionsFromKeywordsQuery: getProductDescriptionSuggestionsFromKeywordsQuery
	) {}

	@Post()
	@UsePipes()
	@ApiBody({
		type: GetDescriptionSuggetionDto,
		examples: {
			a: {
				summary: "Create product description suggetions from keywords",
				description: "Example of a body to generate product description suggetions from keywords",
				value: {
					language: "ES-CO",
					productName: "Aretes delfines",
					keyWords: ["Bronce", "Variantes Rosado"]
				}
			}
		}
	})
	async getProductDescriptionSuggestionsFromKeywords(
		@Body() body: GetDescriptionSuggetionDto,
		@Res() res: Response
	) {
		try {
			const result = await this.GetProductDescriptionSuggestionsFromKeywordsQuery.execute({
				payload: { ...body }
			})
			handlerHttpResponse(res, {
				data: result,
				message: "Product description suggetion generated successfully from OpenAI",
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			handlerHttpResponse(res, {
				data: null,
				message: error instanceof Error ? error.message : "",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}
}
