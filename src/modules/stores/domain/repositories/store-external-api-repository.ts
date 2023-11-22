import { StoreExternalApi } from "../entities"

export interface IStoreExternalApiRepository {
	getStoreExternalApis(storeId: number): Promise<StoreExternalApi | null>
}
