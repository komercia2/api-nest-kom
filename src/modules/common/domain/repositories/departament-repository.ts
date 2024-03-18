import { DepartamentEntity } from "../entities"

export interface IDepartamentRepository {
	getAll(): Promise<DepartamentEntity[]>
	getByCountry(countryId: number): Promise<DepartamentEntity[]>
}
