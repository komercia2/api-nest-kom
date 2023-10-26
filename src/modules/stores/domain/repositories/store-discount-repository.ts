import { StoreDiscountEntity } from "../entities"

export interface IStoreDiscountRepository {
	getDiscountsByStoreId(storeId: number): Promise<StoreDiscountEntity[] | null>
}
