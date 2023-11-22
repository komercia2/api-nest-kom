import { Inject, Injectable } from "@nestjs/common"

import { IEditorSuggetionsRepository } from "../../domain/repositories"
import { ApplicationInjectionTokens } from "../application-injection.tokens"
import { getEditorSettingSuggestionsDTO } from "./dtos"

@Injectable()
export class GetEditorSettingSuggestionsQuery {
	constructor(
		@Inject(ApplicationInjectionTokens.IEditorSuggetionsRepository)
		private readonly editorSuggetionsRepository: IEditorSuggetionsRepository
	) {}

	async execute(input: getEditorSettingSuggestionsDTO) {
		const { storeId, inputSetting, keyWords, theme, improveAllTexts } = input

		const cleanedKeyWords = this.cleanKeyWords(keyWords)

		return this.editorSuggetionsRepository.getEditorSettingSuggestions(
			storeId,
			inputSetting,
			cleanedKeyWords,
			theme,
			improveAllTexts
		)
	}

	private cleanKeyWords(keyWords: string[]) {
		const nonRepeatedKeyWords = [...new Set(keyWords)]
		const keyWordsWithoutSpaces = nonRepeatedKeyWords.map((keyWord) => keyWord.trim().toLowerCase())
		return keyWordsWithoutSpaces
	}
}
