import { StoreProductSubcategoryEntity } from "../entities"

export interface IStoreProductSubcategoryRepository {
	getStoreProductSubcategories(storeId: number): Promise<StoreProductSubcategoryEntity[]>
}
