import { StoreEntitiesEntity } from "../entities"

export interface IStoreEntitiesRepository {
	getStoreEntities(storeId: number): Promise<StoreEntitiesEntity[]>
}
