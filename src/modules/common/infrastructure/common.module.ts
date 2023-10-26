import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import { Ciudades } from "src/entities"

import { CommonApplicationInjectionTokens } from "../application/common-application-injection-token"
import { GetAllCitiesQuery } from "../application/query"
import { CommonInfrastructureInjectionTokens } from "./common-infrastructure-injection-tokens"
import { CityController } from "./controllers"
import { MySQLCityRepository } from "./repositories"
import { MySQLCityService } from "./services"

const application = [
	{
		provide: CommonApplicationInjectionTokens.ICityRepository,
		useClass: MySQLCityRepository
	}
]

const infrastructure = [
	{
		provide: CommonInfrastructureInjectionTokens.GetAllCitiesQuery,
		useClass: GetAllCitiesQuery
	},
	{
		provide: CommonInfrastructureInjectionTokens.MySQLCityService,
		useClass: MySQLCityService
	}
]

@Module({
	imports: [TypeOrmModule.forFeature([Ciudades])],
	controllers: [CityController],
	providers: [...application, ...infrastructure]
})
export class CommonModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(PublicApiKeyAuthMiddleware).forRoutes(CityController)
	}
}
