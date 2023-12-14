import { StoreHeadquartersEntity } from "../entities"

export interface IStoreHeadquartersRepository {
	findById(id: number): Promise<StoreHeadquartersEntity[]>
}
