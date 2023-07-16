import { CityEntity } from "../entities/city"

/**
 * @name ICityRepsository
 * @description Interface for city repository to be implemented by infrastructure
 */
export interface ICityRepsository {
	getCitiesWithDepartament: () => Promise<CityEntity[]>
}
