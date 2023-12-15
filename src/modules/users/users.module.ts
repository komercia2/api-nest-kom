import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import { DireccionesUsuario } from "src/entities"

import { GetAdressesByUserIdQuery } from "./application/query"
import { UsersApplicationInjectionTokens } from "./application/users-application-injection-tokens"
import { PublicUserController } from "./infrastructure/controllers/public"
import { UserRepository } from "./infrastructure/repositories"
import { MysqlUserService } from "./infrastructure/services"
import { UsersInfrastructureInjectionTokens } from "./infrastructure/users-infrastructure-injection-tokens"

const application = [
	{
		provide: UsersApplicationInjectionTokens.IUserRepository,
		useClass: UserRepository
	}
]

const infrastructure = [
	{
		provide: UsersInfrastructureInjectionTokens.MySQLUserService,
		useClass: MysqlUserService
	},
	{
		provide: UsersInfrastructureInjectionTokens.GetAdressesByUserIdQuery,
		useClass: GetAdressesByUserIdQuery
	}
]

@Module({
	imports: [TypeOrmModule.forFeature([DireccionesUsuario])],
	controllers: [PublicUserController],
	providers: [...application, ...infrastructure]
})
export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(PublicApiKeyAuthMiddleware).forRoutes(PublicUserController)
	}
}
