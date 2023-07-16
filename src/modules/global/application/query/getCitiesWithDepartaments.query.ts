import { ICityRepsository } from "@global/domain/repositories"
import { Inject, Injectable } from "@nestjs/common"

import { ApplicationInjectionTokens } from "../application-injection.tokens"

/**
 * @name GetCitiesWithDepartamentsQuery
 * @description Query to get all cities with departaments from the database using the city repository
 */
Injectable()
export class GetCitiesWithDepartamentsQuery {
	constructor(
		@Inject(ApplicationInjectionTokens.ICityRepsository)
		private readonly cityRepository: ICityRepsository
	) {}

	/**
	 * @name execute
	 * @description Method to execute the query
	 * @returns Promise<CityEntity[]>
	 */
	async execute() {
		return await this.cityRepository.getCitiesWithDepartament()
	}
}
