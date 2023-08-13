import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { LaravelAuthMiddleware } from "@shared/infrastructure/middlewares/auth"

import { ApplicationInjectionTokens } from "./application/application-injection.tokens"
import {
	CreateTemplate15Command,
	DeleteTemplate15Command,
	UpdateTemplate15Command
} from "./application/command"
import {
	CreateWebSiteCommand,
	UpdateWebSiteCommand,
	UpdateWebsiteSettingsCommand
} from "./application/command/websites"
import { FindTemplate15ByIdQuery, FindTemplateRepositoryQuery } from "./application/query"
import {
	CheckDomainAvailabilityQuery,
	CheckIfStoreHasMainWebSiteQuery,
	CheckSubDomainAvailabilityQuery,
	GetWebsitesByIdQuery
} from "./application/query/websites"
import { GetWebsiteQuery } from "./application/query/websites/getWebsiteQuery"
import { Template15Controller, WebsitesController } from "./infrastructure/controllers"
import { InfrastructureInjectionTokens } from "./infrastructure/infrastructure-injection.tokens"
import { Template15Model, Template15Schema } from "./infrastructure/models/template15"
import { WebSiteModel, WebsitesSchema } from "./infrastructure/models/website"
import {
	Template15MongooseRepository,
	WebsiteMongooseRepository
} from "./infrastructure/repositories"
import {
	Template15MongoService,
	WebSiteMockService,
	WebsiteMongooseService
} from "./infrastructure/services"

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
	},
	{
		provide: InfrastructureInjectionTokens.CreateWebsiteCommand,
		useClass: CreateWebSiteCommand
	},
	{
		provide: InfrastructureInjectionTokens.CheckDomainAvailabilityQuery,
		useClass: CheckDomainAvailabilityQuery
	},
	{
		provide: InfrastructureInjectionTokens.CheckSubDomainAvailabilityQuery,
		useClass: CheckSubDomainAvailabilityQuery
	},
	{
		provide: InfrastructureInjectionTokens.GetWebsitesByIdQuery,
		useClass: GetWebsitesByIdQuery
	},
	{
		provide: InfrastructureInjectionTokens.CheckIfStoreHasMainWebSiteQuery,
		useClass: CheckIfStoreHasMainWebSiteQuery
	},
	{
		provide: InfrastructureInjectionTokens.GetWebsiteQuery,
		useClass: GetWebsiteQuery
	},
	{
		provide: InfrastructureInjectionTokens.UpdateWebsiteCommand,
		useClass: UpdateWebSiteCommand
	},
	{
		provide: InfrastructureInjectionTokens.FindTemplateRepoitoryQuery,
		useClass: FindTemplateRepositoryQuery
	},
	{
		provide: InfrastructureInjectionTokens.UpdateWebsiteSettingsCommand,
		useClass: UpdateWebsiteSettingsCommand
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
	},
	{
		provide: ApplicationInjectionTokens.IWebSiteRepository,
		useClass: WebsiteMongooseRepository
	},
	{
		provide: InfrastructureInjectionTokens.WebsiteMongooseService,
		useClass: WebsiteMongooseService
	},
	{
		provide: InfrastructureInjectionTokens.WebSiteMockService,
		useClass: WebSiteMockService
	}
]

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Template15Model.name, schema: Template15Schema },
			{ name: WebSiteModel.name, schema: WebsitesSchema }
		])
	],
	controllers: [Template15Controller, WebsitesController],
	providers: [...application, ...infrastructure]
})
export class TemplatesModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LaravelAuthMiddleware)
			.exclude({ path: "v1/templates/template15/:storeId", method: RequestMethod.GET })
			.exclude({ path: "v1/templates/websites/template", method: RequestMethod.GET })
			.forRoutes({ path: "v1/templates/*", method: RequestMethod.ALL })
	}
}
