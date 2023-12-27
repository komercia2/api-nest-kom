import { CACHE_MANAGER } from "@nestjs/cache-manager"
import { Inject } from "@nestjs/common"
import { Cache } from "cache-manager"
import { Ciudades } from "src/entities"

import { CityEntity } from "../../domain/entities"
import { ICityRepository } from "../../domain/repositories"
import { CommonInfrastructureInjectionTokens } from "../common-infrastructure-injection-tokens"
import { MySQLCityService } from "../services"

export class MySQLCityRepository implements ICityRepository {
	constructor(
		@Inject(CommonInfrastructureInjectionTokens.MySQLCityService)
		private readonly mysqlCityService: MySQLCityService,

		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache
	) {}

	async getAll(): Promise<CityEntity[]> {
		const cities = await this.cacheManager.get<CityEntity[]>("cities")
		if (cities) return cities

		const citiesFromDatabase = await this.mysqlCityService.getAll()
		const formattedCities = citiesFromDatabase.map((city) => MySQLCityRepository.toEntity(city))

		await this.cacheManager.set("cities", formattedCities, 60 * 60)

		return formattedCities
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
