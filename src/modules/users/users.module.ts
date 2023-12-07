import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import { Users } from "src/entities"

import { UpdateRoleCommand } from "./application/command"
import { UsersApplicationInjectionTokens } from "./application/users-application-injection-tokens"
import { PublicUserController } from "./infrastructure/controllers/public"
import { MySQLUserRepository } from "./infrastructure/repositories"
import { MySQLUserService } from "./infrastructure/services"
import { UsersInfrastructureInjectionTokens } from "./infrastructure/users-infrastructure-injection-tokens"

const application = [
	{
		provide: UsersApplicationInjectionTokens.IUserRepository,
		useClass: MySQLUserRepository
	}
]

const infrastructure = [
	{
		provide: UsersInfrastructureInjectionTokens.UpdateRoleCommand,
		useClass: UpdateRoleCommand
	},
	{
		provide: UsersInfrastructureInjectionTokens.MySQLUserService,
		useClass: MySQLUserService
	}
]

@Module({
	imports: [TypeOrmModule.forFeature([Users])],
	providers: [...application, ...infrastructure],
	controllers: [PublicUserController]
})
export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(PublicApiKeyAuthMiddleware).forRoutes(PublicUserController)
	}
}
