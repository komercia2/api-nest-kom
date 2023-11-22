import { StoreGeolocationEntity } from "../entities"

export interface IStoreGeolocationRepository {
	getStoreGeolocation(storeId: number): Promise<StoreGeolocationEntity[]>
}
