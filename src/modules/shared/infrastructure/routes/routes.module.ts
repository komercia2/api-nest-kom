import { Module } from "@nestjs/common"
import { RouterModule, RouteTree } from "@nestjs/core"
import { TemplatesModule } from "@templates/templates.module"
import { AppModule } from "src/app.module"
import { AiSuggetionsModule } from "src/modules/ai-suggetions/ai-suggetions.module"
import { CommonModule } from "src/modules/common/common.module"
import { HooksModule } from "src/modules/hooks/hooks.module"
import { PaymentsModule } from "src/modules/payments/payments.module"
import { ProductModule } from "src/modules/products/products.module"
import { StoresModule } from "src/modules/stores/stores.module"

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
