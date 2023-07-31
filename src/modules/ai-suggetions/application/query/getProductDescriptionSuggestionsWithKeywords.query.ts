import { Inject, Injectable } from "@nestjs/common"

import { IProductSuggetionsRepository } from "../../domain/repositories"
import { ApplicationInjectionTokens } from "../application-injection.tokens"
import { GetDescriptionSuggetionDto } from "./dtos"

@Injectable()
export class getProductDescriptionSuggestionsFromKeywordsQuery {
	constructor(
		@Inject(ApplicationInjectionTokens.IProductDescriptionSuggetionRepository)
		private readonly IProductSuggetionRepository: IProductSuggetionsRepository
	) {}

	async execute({ payload }: { payload: GetDescriptionSuggetionDto }) {
		const { keyWords, language, productName, nWords } = payload

		const cleanedKeyWords = keyWords.map((keyWord) => this.cleanInput(keyWord))
		const keyWordsSet = new Set(cleanedKeyWords)

		const suggetion =
			await this.IProductSuggetionRepository.getProductDescriptionSuggestionsFromKeywords(
				productName,
				[...keyWordsSet],
				language,
				nWords
			)

		return this.cleanOutput(suggetion.getDescrptionSuggetion())
	}

	cleanInput = (input: string) => input.trim().toLowerCase()

	cleanOutput = (output: string) => {
		return output.trim().replace(/\n/g, "").replace(/\s+/g, " ")
	}
}
