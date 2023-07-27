import { Inject } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import { ProductDescriptionSuggetionEntity } from "../../domain/entities"
import { IProductSuggetionsRepository } from "../../domain/repositories"
import { InfrastructureInjectionTokens } from "../infrastructure-injection.token"
import { productDescriptionPrompt } from "../prompts"
import { OpenAIProducSuggetionsServices } from "../services"

export class OpenAIProductSuggetionsRepository implements IProductSuggetionsRepository {
	constructor(
		@Inject(InfrastructureInjectionTokens.OpenAIProducSuggetionsServices)
		private readonly openAIProductSuggetionsService: OpenAIProducSuggetionsServices,

		private readonly configurationservice: ConfigService
	) {}

	async getProductDescriptionSuggestionsFromKeywords(
		productName: string,
		keyWords: string[],
		language: string,
		nWords?: number
	): Promise<ProductDescriptionSuggetionEntity> {
		const apiKey = this.configurationservice.get<string>("OPENAI_API_KEY")

		const preparedPrompt = productDescriptionPrompt(productName, keyWords, language, nWords)

		if (!apiKey) throw new Error("OPENAI_API_KEY is not defined")

		const response = await this.openAIProductSuggetionsService.getProductDescriptionSuggetion(
			apiKey,
			preparedPrompt
		)

		if (!response?.content) throw new Error("OpenAI response is null")

		return new ProductDescriptionSuggetionEntity(response.content)
	}
}
