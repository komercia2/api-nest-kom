import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import { Bancos, Ciudades, Departamentos } from "src/entities"

import { CommonApplicationInjectionTokens } from "./application/common-application-injection-token"
import {
	GetAllBanksByCountryQuery,
	GetAllCitiesQuery,
	GetAllDepartamentsQuery
} from "./application/query"
import { GetDepartamentsByCountryQuery } from "./application/query/get-departaments-by-country-query"
import { CommonInfrastructureInjectionTokens } from "./infrastructure/common-infrastructure-injection-tokens"
import { CityController, DepartamentController } from "./infrastructure/controllers"
import { PublicBanksController } from "./infrastructure/controllers/bank-controller"
import {
	BankRepository,
	DepartamentRepository,
	MySQLCityRepository
} from "./infrastructure/repositories"
import {
	MySQLBankService,
	MySQLCityService,
	MySQLDepartamentService
} from "./infrastructure/services"

const application = [
	{
		provide: CommonApplicationInjectionTokens.ICityRepository,
		useClass: MySQLCityRepository
	},
	{
		provide: CommonApplicationInjectionTokens.IDepartamentRepository,
		useClass: DepartamentRepository
	},
	{
		provide: CommonApplicationInjectionTokens.IBankRepository,
		useClass: BankRepository
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
		provide: CommonInfrastructureInjectionTokens.GetAllBanksByCountryQuery,
		useClass: GetAllBanksByCountryQuery
	},
	{
		provide: CommonInfrastructureInjectionTokens.MySQLCityService,
		useClass: MySQLCityService
	},
	{
		provide: CommonInfrastructureInjectionTokens.MySQLDepartamentService,
		useClass: MySQLDepartamentService
	},
	{
		provide: CommonInfrastructureInjectionTokens.MySQLBankService,
		useClass: MySQLBankService
	},
	{
		provide: CommonInfrastructureInjectionTokens.GetDepartamentsByCountryQuery,
		useClass: GetDepartamentsByCountryQuery
	},
	{
		provide: CommonInfrastructureInjectionTokens.GetDepartamentsByCountryQuery,
		useClass: GetDepartamentsByCountryQuery
	}
]

@Module({
	imports: [TypeOrmModule.forFeature([Ciudades, Departamentos, Bancos])],
	controllers: [CityController, DepartamentController, PublicBanksController],
	providers: [...application, ...infrastructure]
})
export class CommonModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(PublicApiKeyAuthMiddleware).forRoutes(CityController)
		consumer.apply(PublicApiKeyAuthMiddleware).forRoutes(DepartamentController)
		consumer.apply(PublicApiKeyAuthMiddleware).forRoutes(PublicBanksController)
	}
}
