import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import { Ciudades, Departamentos } from "src/entities"

import { CommonApplicationInjectionTokens } from "./application/common-application-injection-token"
import { GetAllCitiesQuery, GetAllDepartamentsQuery } from "./application/query"
import { CommonInfrastructureInjectionTokens } from "./infrastructure/common-infrastructure-injection-tokens"
import { CityController, DepartamentController } from "./infrastructure/controllers"
import { DepartamentRepository, MySQLCityRepository } from "./infrastructure/repositories"
import { MySQLCityService, MySQLDepartamentService } from "./infrastructure/services"

const application = [
	{
		provide: CommonApplicationInjectionTokens.ICityRepository,
		useClass: MySQLCityRepository
	},
	{
		provide: CommonApplicationInjectionTokens.IDepartamentRepository,
		useClass: DepartamentRepository
	}
]

const infrastructure = [
	{
		provide: CommonInfrastructureInjectionTokens.GetAllCitiesQuery,
		useClass: GetAllCitiesQuery
	},
	{
		provide: CommonInfrastructureInjectionTokens.GetAllDepartamentsQuery,
		useClass: GetAllDepartamentsQuery
	},
	{
		provide: CommonInfrastructureInjectionTokens.MySQLCityService,
		useClass: MySQLCityService
	},
	{
		provide: CommonInfrastructureInjectionTokens.MySQLDepartamentService,
		useClass: MySQLDepartamentService
	}
]

@Module({
	imports: [TypeOrmModule.forFeature([Ciudades, Departamentos])],
	controllers: [CityController, DepartamentController],
	providers: [...application, ...infrastructure]
})
export class CommonModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(PublicApiKeyAuthMiddleware).forRoutes(CityController)
		consumer.apply(PublicApiKeyAuthMiddleware).forRoutes(DepartamentController)
	}
}
