import { Module } from "@nestjs/common"
import { RouterModule, RouteTree } from "@nestjs/core"
import { TemplatesModule } from "@templates/templates.module"
import { AppModule } from "src/app.module"
import { AiSuggetionsModule } from "src/modules/ai-suggetions/ai-suggetions.module"
import { AuthModule } from "src/modules/auth/auth.module"
import { ChatbotsModule } from "src/modules/chatbots/chatbots.module"
import { CommonModule } from "src/modules/common/common.module"
import { CouponsModule } from "src/modules/coupons/coupons.module"
import { HooksModule } from "src/modules/hooks/hooks.module"
import { MailsModule } from "src/modules/mails/mails.module"
import { NotificationsModule } from "src/modules/notifications/notifications.module"
import { OrdersModule } from "src/modules/orders/orders.module"
import { PanelModule } from "src/modules/panel/panel.module"
import { PaymentGateawaysModule } from "src/modules/payment-gateaways/payment-gateaways.module"
import { PaymentsModule } from "src/modules/payments/payments.module"
import { ProductModule } from "src/modules/products/products.module"
import { SalesModule } from "src/modules/sales/sales.module"
import { StoresModule } from "src/modules/stores/stores.module"
import { SubscribersModule } from "src/modules/subscribers/subscribers.module"
import { SuperModule } from "src/modules/super/super.module"
import { UsersModule } from "src/modules/users/users.module"
import { WhatsappModule } from "src/modules/whatsapp/whatsapp.module"

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
	},
	{
		path: `${apiVersions.v1}/orders`,
		module: OrdersModule
	},
	{
		path: `${apiVersions.v1}/notifications`,
		module: NotificationsModule
	},
	{
		path: `${apiVersions.v1}/whatsapp`,
		module: WhatsappModule
	},
	{
		path: `${apiVersions.v1}/cuopons`,
		module: CouponsModule
	},
	{
		path: `${apiVersions.v1}/payment-gateaways`,
		module: PaymentGateawaysModule
	},
	{
		path: `${apiVersions.v1}/chatbots`,
		module: ChatbotsModule
	},
	{
		path: `${apiVersions.v1}/subscribers`,
		module: SubscribersModule
	},
	{
		path: `${apiVersions.v1}/panel`,
		module: PanelModule
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
