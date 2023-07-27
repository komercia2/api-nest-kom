import { ProductDescriptionSuggetionEntity } from "../entities"

export interface IProductSuggetionsRepository {
	getProductDescriptionSuggestionsFromKeywords(
		productName: string,
		keyWords: string[],
		language: string,
		nWords?: number
	): Promise<ProductDescriptionSuggetionEntity>
}
