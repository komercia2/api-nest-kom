import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import { DireccionesUsuario, Users } from "src/entities"

import { CreateUserAdressCommand, DeleteUserAdressCommand } from "./application/command"
import { AuthenticateCheckoutUserQuery, GetAdressesByUserIdQuery } from "./application/query"
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
	},
	{
		provide: UsersInfrastructureInjectionTokens.DeleteUserAdressCommand,
		useClass: DeleteUserAdressCommand
	},
	{
		provide: UsersInfrastructureInjectionTokens.CreateUserAdressCommand,
		useClass: CreateUserAdressCommand
	},
	{
		provide: UsersInfrastructureInjectionTokens.AuthenticateCheckoutUserQuery,
		useClass: AuthenticateCheckoutUserQuery
	}
]

@Module({
	imports: [TypeOrmModule.forFeature([DireccionesUsuario, Users])],
	controllers: [PublicUserController],
	providers: [...application, ...infrastructure]
})
export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(PublicApiKeyAuthMiddleware).forRoutes({
			path: "v1/users/public/users/:userId/authenticate-checkout",
			method: RequestMethod.POST
		})
	}
}
