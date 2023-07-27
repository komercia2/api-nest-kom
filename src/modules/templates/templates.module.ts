import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { LaravelAuthMiddleware } from "@shared/infrastructure/middlewares/auth"

import { ApplicationInjectionTokens } from "./application/application-injection.tokens"
import {
	CreateTemplate15Command,
	DeleteTemplate15Command,
	UpdateTemplate15Command
} from "./application/command"
import { FindTemplate15ByIdQuery } from "./application/query"
import { Template15Controller } from "./infrastructure/controllers"
import { InfrastructureInjectionTokens } from "./infrastructure/infrastructure-injection.tokens"
import { Template15Model, Template15Schema } from "./infrastructure/models/template15"
import { Template15MongooseRepository } from "./infrastructure/repositories"
import { Template15MongoService } from "./infrastructure/services"

const application = [
	{
		provide: InfrastructureInjectionTokens.CreateTemplate15Command,
		useClass: CreateTemplate15Command
	},
	{
		provide: InfrastructureInjectionTokens.FindTemplate15ByIdQuery,
		useClass: FindTemplate15ByIdQuery
	},

	{
		provide: InfrastructureInjectionTokens.UpdateTemplate15Command,
		useClass: UpdateTemplate15Command
	},
	{
		provide: InfrastructureInjectionTokens.DeleteTemplate15Command,
		useClass: DeleteTemplate15Command
	}
]

const infrastructure = [
	{
		provide: InfrastructureInjectionTokens.Template15MongoService,
		useClass: Template15MongoService
	},
	{
		provide: ApplicationInjectionTokens.ITemplate15Repository,
		useClass: Template15MongooseRepository
	}
]

@Module({
	imports: [MongooseModule.forFeature([{ name: Template15Model.name, schema: Template15Schema }])],
	controllers: [Template15Controller],
	providers: [...application, ...infrastructure]
})
export class TemplatesModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LaravelAuthMiddleware)
			.exclude({ path: "v1/templates/template15/:storeId", method: RequestMethod.GET })
			.forRoutes({ path: "v1/templates/*", method: RequestMethod.ALL })
	}
}
