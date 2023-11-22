import { Body, Controller, HttpStatus, Inject, Post, Res, UsePipes } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { Response } from "express"

import { GetEditorSettingSuggestionsQuery } from "../../application/query"
import { getEditorSettingSuggestionsDTO } from "../../application/query/dtos"
import { InfrastructureInjectionTokens } from "../infrastructure-injection.token"

@ApiTags("AI Editor Suggetions")
@Controller("editor-settings")
export class EditorSettingSuggetionsController {
	constructor(
		@Inject(InfrastructureInjectionTokens.GetEditorSettingSuggestionsQuery)
		private readonly GetEditorSettingSuggestionsQuery: GetEditorSettingSuggestionsQuery
	) {}

	@Post()
	@UsePipes()
	async getEditorSettingSuggetions(
		@Body() body: getEditorSettingSuggestionsDTO,
		@Res() res: Response
	) {
		try {
			const response = await this.GetEditorSettingSuggestionsQuery.execute(body)

			const { inputSetting: _, ...rest } = response

			return handlerHttpResponse(res, {
				data: rest,
				message: "Editor setting suggetions",
				statusCode: HttpStatus.OK,
				success: true
			})
		} catch (error) {
			console.log(error)
			return handlerHttpResponse(res, {
				data: null,
				message: "Internal server error",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}
}
