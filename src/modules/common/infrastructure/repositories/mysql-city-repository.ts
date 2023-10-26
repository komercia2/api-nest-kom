import { Inject } from "@nestjs/common"
import { Ciudades } from "src/entities"

import { CityEntity } from "../../domain/entities"
import { ICityRepository } from "../../domain/repositories"
import { CommonInfrastructureInjectionTokens } from "../common-infrastructure-injection-tokens"
import { MySQLCityService } from "../services"

export class MySQLCityRepository implements ICityRepository {
	constructor(
		@Inject(CommonInfrastructureInjectionTokens.MySQLCityService)
		private readonly mysqlCityService: MySQLCityService
	) {}

	async getAll(): Promise<CityEntity[]> {
		const cities = await this.mysqlCityService.getAll()
		return cities.map(MySQLCityRepository.toEntity)
	}

	static toEntity = (city: Ciudades): CityEntity => ({
		id: city.id,
		nombre_ciu: city.nombreCiu,
		dep: city.dep,
		codigo_dane: city.codigoDane,
		departamento: {
			id: city.departamento.id,
			nombre_dep: city.departamento.nombreDep,
			paises_id: city.departamento.paisesId
		}
	})
}
