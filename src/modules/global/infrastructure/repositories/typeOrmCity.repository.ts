import { CityEntity, DepartamentEntity } from "@global/domain/entities"
import { ICityRepsository } from "@global/domain/repositories"
import { Inject } from "@nestjs/common"

import { InfrastructureInjectionTokens } from "../infrastructure-injection.tokens"
import { TypeOrmCityService } from "../services"

/**
 * @name TypeOrmCityRepository
 * @description Repository to get cities from the database using typeorm service. This repository implements ICityRepsository
 *
 */
export class TypeOrmCityRepository implements ICityRepsository {
	constructor(
		@Inject(InfrastructureInjectionTokens.TypeOrmCityService)
		private readonly typeOrmCityService: TypeOrmCityService
	) {}

	/**
	 * @name getCitiesWithDepartament
	 * @returns Promise<CityEntity[]>
	 * @description Method to get all cities with departaments from the database using typeorm service
	 */
	async getCitiesWithDepartament(): Promise<CityEntity[]> {
		const cities = await this.typeOrmCityService.findAllWithDepartaments()
		return cities.map(({ id, codigoDane, dep, nombreCiu, dep2 }) => {
			const city = new CityEntity({
				id,
				daneCode: codigoDane,
				departamentId: dep,
				name: nombreCiu,
				departament: new DepartamentEntity({
					id: dep2.id,
					name: dep2.nombreDep,
					countryId: dep2.paisesId
				})
			})
			return city
		})
	}
}
