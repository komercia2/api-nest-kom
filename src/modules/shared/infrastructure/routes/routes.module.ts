import { Module } from "@nestjs/common"
import { RouterModule, RouteTree } from "@nestjs/core"
import { TemplatesModule } from "@templates/templates.module"
import { AppModule } from "src/app.module"
import { AiSuggetionsModule } from "src/modules/ai-suggetions/ai-suggetions.module"
import { AuthModule } from "src/modules/auth/auth.module"
import { CommonModule } from "src/modules/common/common.module"
import { HooksModule } from "src/modules/hooks/hooks.module"
import { MailsModule } from "src/modules/mails/mails.module"
import { PaymentsModule } from "src/modules/payments/payments.module"
import { ProductModule } from "src/modules/products/products.module"
import { SalesModule } from "src/modules/sales/sales.module"
import { StoresModule } from "src/modules/stores/stores.module"
import { SuperModule } from "src/modules/super/super.module"
import { UsersModule } from "src/modules/users/users.module"

const apiVersions = { v1: "v1" }

/**
 * @name routes
 * @description Routes of the application to be registered in the application module
 * @returns RouteTree[]
 */
const routes: RouteTree[] = [
	{
		path: "/",
		module: AppModule
	},
	{
		path: `${apiVersions.v1}/ai-suggetions`,
		module: AiSuggetionsModule
	},
	{
		path: `${apiVersions.v1}/templates`,
		module: TemplatesModule
	},
	{
		path: `${apiVersions.v1}/products`,
		module: ProductModule
	},
	{
		path: `${apiVersions.v1}/stores`,
		module: StoresModule
	},
	{
		path: `${apiVersions.v1}/common`,
		module: CommonModule
	},
	{
		path: `${apiVersions.v1}/payments`,
		module: PaymentsModule
	},
	{
		path: `${apiVersions.v1}/hooks`,
		module: HooksModule
	},
	{
		path: `${apiVersions.v1}/users`,
		module: UsersModule
	},
	{
		path: `${apiVersions.v1}/super`,
		module: SuperModule
	},
	{
		path: `${apiVersions.v1}/auth`,
		module: AuthModule
	},
	{
		path: `${apiVersions.v1}/mails`,
		module: MailsModule
	},
	{
		path: `${apiVersions.v1}/sales`,
		module: SalesModule
	}
]

/**
 * @name RoutesModule
 * @description Module to register all routes of the application
 */
@Module({
	imports: [RouterModule.register(routes)]
})
export class RoutesModule {}
