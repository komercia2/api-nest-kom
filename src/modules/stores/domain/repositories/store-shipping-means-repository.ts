import { StoreShippingMeanEntity } from "../entities"

export interface IStoreShippingMeansRepository {
	getStoreShippingMeans(storeId: number): Promise<StoreShippingMeanEntity>
}
