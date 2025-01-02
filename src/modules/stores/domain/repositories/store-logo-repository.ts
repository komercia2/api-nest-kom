import { StoreLogoEntity } from "../entities"

export interface IStoreLogoRepository {
	getLogo(storeID: number): Promise<StoreLogoEntity | null>
}
