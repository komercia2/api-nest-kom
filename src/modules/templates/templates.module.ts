import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LaravelAuthMiddleware } from "@shared/infrastructure/middlewares/auth"
import { PublicApiKeyAuthMiddleware } from "@shared/infrastructure/middlewares/keys"
import { Template_5Settings, TemplateGeneral, TemplateWhatsappSettings } from "src/entities"
import { Tiendas } from "src/entities/Tiendas"
import { TiendasInfo } from "src/entities/TiendasInfo"

import { ApplicationInjectionTokens } from "./application/application-injection.tokens"
import {
	CreateTemplate15Command,
	DeleteTemplate15Command,
	UpdateTemplate15Command
} from "./application/command"
import {
	CreateWebSiteCommand,
	DeleteWebsiteCommand,
	UpdateWebSiteCommand,
	UpdateWebsiteSettingsCommand
} from "./application/command/websites"
import { FindTemplate15ByIdQuery, FindTemplateRepositoryQuery } from "./application/query"
import { GetTemplate5Query, GetTemplate99Query } from "./application/query/store-template-settings"
import { GetStoreTemplateQuery } from "./application/query/store-template-settings/get-template-setting-query"
import {
	CheckDomainAvailabilityQuery,
	CheckIfStoreHasMainWebSiteQuery,
	CheckSubDomainAvailabilityQuery,
	GetWebsitesByIdQuery
} from "./application/query/websites"
import { GetWebsiteQuery } from "./application/query/websites/getWebsiteQuery"
import {
	PublicStoreTemplateSettingsController,
	Template15Controller,
	WebsitesController
} from "./infrastructure/controllers"
import { InfrastructureInjectionTokens } from "./infrastructure/infrastructure-injection.tokens"
import { Template15Model, Template15Schema } from "./infrastructure/models/template15"
import { WebSiteModel, WebsitesSchema } from "./infrastructure/models/website"
import {
	MySQLTemplate5Repository,
	MySQLTemplate99Repository,
	MySQLTemplateRepository,
	Template15MongooseRepository,
	WebsiteMongooseRepository
} from "./infrastructure/repositories"
import {
	MysqlTemplate5Service,
	MysqlTemplate99Service,
	MysqlTemplatesService,
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
	},
	{
		provide: InfrastructureInjectionTokens.DeleteWebsiteCommand,
		useClass: DeleteWebsiteCommand
	},
	{
		provide: InfrastructureInjectionTokens.GetTemplate5Query,
		useClass: GetTemplate5Query
	},
	{
		provide: InfrastructureInjectionTokens.GetStoreTemplateQuery,
		useClass: GetStoreTemplateQuery
	},
	{
		provide: InfrastructureInjectionTokens.GetTemplate99Query,
		useClass: GetTemplate99Query
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
		provide: ApplicationInjectionTokens.ITemplate5Repository,
		useClass: MySQLTemplate5Repository
	},
	{
		provide: ApplicationInjectionTokens.ITemplateRepository,
		useClass: MySQLTemplateRepository
	},
	{
		provide: ApplicationInjectionTokens.ITemplate99Repository,
		useClass: MySQLTemplate99Repository
	},
	{
		provide: InfrastructureInjectionTokens.MySqlTemplateRepository,
		useClass: MySQLTemplateRepository
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
	},
	{
		provide: InfrastructureInjectionTokens.MySqlTemplate5Repository,
		useClass: MySQLTemplate5Repository
	},
	{
		provide: InfrastructureInjectionTokens.MysqlTemplate5Service,
		useClass: MysqlTemplate5Service
	},
	{
		provide: InfrastructureInjectionTokens.MySqlTemplate99Repository,
		useClass: MySQLTemplate99Repository
	},
	{
		provide: InfrastructureInjectionTokens.MysqlTemplate99Service,
		useClass: MysqlTemplate99Service
	},
	{
		provide: InfrastructureInjectionTokens.MySqlTemplatesRepository,
		useClass: MysqlTemplatesService
	}
]

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Template15Model.name, schema: Template15Schema },
			{ name: WebSiteModel.name, schema: WebsitesSchema }
		]),
		TypeOrmModule.forFeature([
			Tiendas,
			TiendasInfo,
			Template_5Settings,
			TemplateWhatsappSettings,
			TemplateGeneral
		])
	],
	controllers: [Template15Controller, WebsitesController, PublicStoreTemplateSettingsController],
	providers: [...application, ...infrastructure]
})
export class TemplatesModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LaravelAuthMiddleware)
			.exclude({ path: "v1/templates/template15/:storeId", method: RequestMethod.GET })
			.exclude({ path: "v1/templates/websites/template", method: RequestMethod.GET })
			.forRoutes(
				{ path: "v1/templates/websites", method: RequestMethod.GET },
				{ path: "v1/templates/*", method: RequestMethod.POST },
				{ path: "v1/templates/*", method: RequestMethod.PATCH },
				{ path: "v1/templates/*", method: RequestMethod.PUT },
				{ path: "v1/templates/*", method: RequestMethod.DELETE }
			)

		// .forRoutes({ path: "v1/templates/*", method: RequestMethod.ALL })
		// .apply(PublicApiKeyAuthMiddleware)
		// .forRoutes(PublicStoreTemplateSettingsController)
	}
}
