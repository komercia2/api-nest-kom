import { DepartamentEntity } from "../entities"

export interface IDepartamentRepository {
	getAll(): Promise<DepartamentEntity[]>
}
