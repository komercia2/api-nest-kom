import { EditorSettingSuggetions } from "../entities"

export interface IEditorSuggetionsRepository {
	getEditorSettingSuggestions(
		storeId: number,
		inputSetting: object,
		keyWords: string[],
		theme: string,
		improveAllTexts?: false
	): Promise<EditorSettingSuggetions>
}
