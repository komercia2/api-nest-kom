import { StoreProductCategoryEntity } from "../entities"

export interface IStoreProductCategoryRepository {
	getStoreProductCategories(id: number): Promise<StoreProductCategoryEntity[]>
}
