import { Inject } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import { EditorSettingSuggetions } from "../../domain/entities"
import { IEditorSuggetionsRepository } from "../../domain/repositories"
import { InfrastructureInjectionTokens } from "../infrastructure-injection.token"
import { editorSettingsPrompt } from "../prompts"
import { OpenAIProducSuggetionsServices } from "../services"

export class OpenAIEditorSuggetionsRepository implements IEditorSuggetionsRepository {
	constructor(
		@Inject(InfrastructureInjectionTokens.OpenAIProducSuggetionsServices)
		private readonly openAIProductSuggetionsService: OpenAIProducSuggetionsServices,

		private readonly configurationservice: ConfigService
	) {}

	async getEditorSettingSuggestions(
		storeId: number,
		inputSetting: object,
		keyWords: string[],
		theme: string
	): Promise<EditorSettingSuggetions> {
		const apiKey = this.configurationservice.get<string>("OPENAI_API_KEY")

		const preparedPrompt = editorSettingsPrompt({
			inputSetting,
			keyWords,
			theme,
			storeId
		})

		if (!apiKey) throw new Error("OPENAI_API_KEY is not defined")

		const response = await this.openAIProductSuggetionsService.getProductDescriptionSuggetion(
			apiKey,
			preparedPrompt
		)

		if (!response?.content) throw new Error("OpenAI response is null")

		const parsedResponse = JSON.parse(response.content)

		return new EditorSettingSuggetions(inputSetting, storeId, theme, parsedResponse)
	}
}
