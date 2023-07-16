import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { ApplicationInjectionTokens } from "./application/application-injection.tokens"
import { GetCitiesWithDepartamentsQuery } from "./application/query"
import { CityController } from "./infrastructure/controllers"
import { InfrastructureInjectionTokens } from "./infrastructure/infrastructure-injection.tokens"
import { City, Country, Departament } from "./infrastructure/models"
import { TypeOrmCityRepository } from "./infrastructure/repositories"
import { TypeOrmCityService } from "./infrastructure/services"

/**
 * @name providers
 * @description Providers of the global module
 */
const providers = [
	{
		provide: InfrastructureInjectionTokens.TypeOrmCityService,
		useClass: TypeOrmCityService
	},
	{
		provide: InfrastructureInjectionTokens.GetCitiesWithDepartamentsQuery,
		useClass: GetCitiesWithDepartamentsQuery
	},
	{
		provide: ApplicationInjectionTokens.ICityRepsository,
		useClass: TypeOrmCityRepository
	}
]

/**
 * @name GlobalModule
 * @description Global module to import all dependencies of the global module
 */
@Module({
	imports: [TypeOrmModule.forFeature([City, Departament, Country])],
	providers: [...providers],
	controllers: [CityController]
})
export class GlobalModule {}
