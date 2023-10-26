import { CityEntity } from "../entities"

export interface ICityRepository {
	getAll(): Promise<CityEntity[]>
}
