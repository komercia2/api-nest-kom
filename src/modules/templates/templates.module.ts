import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LaravelAuthMiddleware } from "@shared/infrastructure/middlewares/auth"
import {
	Template_5Settings,
	TemplateGeneral,
	TemplateWhatsappSettings,
	VisitasTienda
} from "src/entities"
import { Tiendas } from "src/entities/Tiendas"
import { TiendasInfo } from "src/entities/TiendasInfo"

import { ApplicationInjectionTokens } from "./application/application-injection.tokens"
import {
	CreateTemplate15Command,
	DeleteTemplate15Command,
	UpdateTemplate15Command
} from "./application/command"
import { IncrementViewsCommand } from "./application/command/increment-views-command"
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
import { Template6Model, Template6Schema } from "./infrastructure/models/template6/template6-model"
import { Template7Model, Template7Schema } from "./infrastructure/models/template7"
import { Template9Model, Template9Schema } from "./infrastructure/models/template9"
import { Template10Model, Template10Schema } from "./infrastructure/models/template10"
import { Template11Model, Template11Schema } from "./infrastructure/models/template11"
import { Template12Model, Template12Schema } from "./infrastructure/models/template12"
import { Template13Model, Template13Schema } from "./infrastructure/models/template13"
import { Template14Model, Template14Schema } from "./infrastructure/models/template14"
import { Template15Model, Template15Schema } from "./infrastructure/models/template15"
import { Template16Model, Template16Schema } from "./infrastructure/models/template16"
import { WapiModel, WapiSchema } from "./infrastructure/models/wapi"
import { WebSiteModel, WebsitesSchema } from "./infrastructure/models/website"
import {
	MySQLTemplate5Repository,
	MySQLTemplate99Repository,
	MySQLTemplateRepository,
	Template15MongooseRepository,
	WebsiteMongooseRepository
} from "./infrastructure/repositories"
import { MongooseTemplate6Repository } from "./infrastructure/repositories/mongoose-template6-repository"
import {
	MongooseTemplate6Service,
	MysqlTemplate5Service,
	MysqlTemplate99Service,
	MysqlTemplatesService,
	Template15MongoService,
	WapiTemplateMongooseService,
	WebSiteMockService,
	WebsiteMongooseService
} from "./infrastructure/services"
import { Template7MongooseService } from "./infrastructure/services/template7-mongoose.service"
import { Template9MongooseService } from "./infrastructure/services/template9-mongoose.service"
import { Template10MongooseService } from "./infrastructure/services/template10-mongoose.service"
import { Template11MongooseService } from "./infrastructure/services/template11-mongoose.service"
import { Template12MongooseService } from "./infrastructure/services/template12-mongoose.service"
import { Template13MongooseService } from "./infrastructure/services/template13-mongoose.service"
import { Template14MongooseService } from "./infrastructure/services/template14-mongoose.service"
import { Template16MongooseService } from "./infrastructure/services/template16-mongoose.service"

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
	},
	{
		provide: InfrastructureInjectionTokens.IncrementViewsCommand,
		useClass: IncrementViewsCommand
	}
]

const infrastructure = [
	{
		provide: ApplicationInjectionTokens.ITemplate16Repository,
		useClass: Template16MongooseService
	},
	{
		provide: ApplicationInjectionTokens.ITemplate14Repository,
		useClass: Template14MongooseService
	},
	{
		provide: ApplicationInjectionTokens.ITemplate13Repository,
		useClass: Template13MongooseService
	},
	{
		provide: ApplicationInjectionTokens.ITemplate11Repository,
		useClass: Template11MongooseService
	},
	{
		provide: ApplicationInjectionTokens.ITemplate10Repository,
		useClass: Template10MongooseService
	},
	{
		provide: ApplicationInjectionTokens.ITemplate9Repository,
		useClass: Template9MongooseService
	},
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
		provide: ApplicationInjectionTokens.ITemplate6Repository,
		useClass: MongooseTemplate6Repository
	},
	{
		provide: ApplicationInjectionTokens.ITemplate7Repository,
		useClass: Template7MongooseService
	},
	{
		provide: ApplicationInjectionTokens.IWapiTemplateRepository,
		useClass: WapiTemplateMongooseService
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
	},
	{
		provide: InfrastructureInjectionTokens.MongooseTemplate6Service,
		useClass: MongooseTemplate6Service
	},
	{
		provide: InfrastructureInjectionTokens.WapiTemplateMongooseService,
		useClass: WapiTemplateMongooseService
	},
	{
		provide: InfrastructureInjectionTokens.Template12MongooseService,
		useClass: Template12MongooseService
	},
	{
		provide: InfrastructureInjectionTokens.Template7MongooseService,
		useClass: Template7MongooseService
	},
	{
		provide: InfrastructureInjectionTokens.Template9MongooseService,
		useClass: Template9MongooseService
	},
	{
		provide: InfrastructureInjectionTokens.Template10MongooseService,
		useClass: Template10MongooseService
	},
	{
		provide: InfrastructureInjectionTokens.Template11MongooseService,
		useClass: Template11MongooseService
	},
	{
		provide: InfrastructureInjectionTokens.Template13MongooseService,
		useClass: Template13MongooseService
	},
	{
		provide: InfrastructureInjectionTokens.Template14MongooseService,
		useClass: Template14MongooseService
	},
	{
		provide: InfrastructureInjectionTokens.Template16MongooseService,
		useClass: Template16MongooseService
	}
]

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Template15Model.name, schema: Template15Schema },
			{ name: WebSiteModel.name, schema: WebsitesSchema },
			{ name: Template6Model.name, schema: Template6Schema },
			{ name: WapiModel.name, schema: WapiSchema },
			{ name: Template12Model.name, schema: Template12Schema },
			{ name: Template7Model.name, schema: Template7Schema },
			{ name: Template9Model.name, schema: Template9Schema },
			{ name: Template10Model.name, schema: Template10Schema },
			{ name: Template11Model.name, schema: Template11Schema },
			{ name: Template13Model.name, schema: Template13Schema },
			{ name: Template14Model.name, schema: Template14Schema },
			{ name: Template16Model.name, schema: Template16Schema }
		]),
		TypeOrmModule.forFeature([
			Tiendas,
			TiendasInfo,
			Template_5Settings,
			TemplateWhatsappSettings,
			TemplateGeneral,
			VisitasTienda,
			TemplateWhatsappSettings
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
			.exclude({ path: "v1/templates/websites/views/:storeId", method: RequestMethod.POST })
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
