import { CacheModule } from "@nestjs/cache-manager"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { JwtModule } from "@nestjs/jwt"
import { MongooseModule } from "@nestjs/mongoose"
import { ScheduleModule } from "@nestjs/schedule"
import { TypeOrmModule } from "@nestjs/typeorm"
import { pinoConfig } from "@shared/infrastructure/configs/logs"
import { MongooseConfigService } from "@shared/infrastructure/database/mongoose"
import { TypeOrmService } from "@shared/infrastructure/database/typeorm"
import { RoutesModule } from "@shared/infrastructure/routes"
import { TemplatesModule } from "@templates/templates.module"
import { LoggerModule } from "nestjs-pino"

import { AppController } from "./app.controller"
import { AiSuggetionsModule } from "./modules/ai-suggetions/ai-suggetions.module"
import { AnalyticsModule } from "./modules/analytics/analytics.module"
import { AuthModule } from "./modules/auth/auth.module"
import { ChatbotsModule } from "./modules/chatbots/chatbots.module"
import { CommonModule } from "./modules/common/common.module"
import { CouponsModule } from "./modules/coupons/coupons.module"
import { HooksModule } from "./modules/hooks/hooks.module"
import { JobsModule } from "./modules/jobs/jobs.module"
import { MailsModule } from "./modules/mails/mails.module"
import { NotificationsModule } from "./modules/notifications/notifications.module"
import { OrdersModule } from "./modules/orders/orders.module"
import { PaymentGateawaysModule } from "./modules/payment-gateaways/payment-gateaways.module"
import { PaymentsModule } from "./modules/payments/payments.module"
import { ProductModule } from "./modules/products/products.module"
import { SalesModule } from "./modules/sales/sales.module"
import { StoresModule } from "./modules/stores/stores.module"
import { SuperModule } from "./modules/super/super.module"
import { UsersModule } from "./modules/users/users.module"
import { WhatsappModule } from "./modules/whatsapp/whatsapp.module"

@Module({
	imports: [
		ScheduleModule.forRoot(),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			global: true,
			signOptions: { expiresIn: "2h" }
		}),
		LoggerModule.forRoot(pinoConfig),
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV}`,
			isGlobal: true
		}),
		CacheModule.register({ isGlobal: true }),
		EventEmitterModule.forRoot({
			wildcard: false,
			delimiter: ".",
			newListener: false,
			removeListener: false,
			maxListeners: 10,
			verboseMemoryLeak: false,
			ignoreErrors: false
		}),
		TypeOrmModule.forRootAsync({ useClass: TypeOrmService, inject: [ConfigModule] }),
		MongooseModule.forRootAsync({ useClass: MongooseConfigService, inject: [ConfigModule] }),
		RoutesModule,
		AiSuggetionsModule,
		ProductModule,
		TemplatesModule,
		CommonModule,
		StoresModule,
		PaymentsModule,
		HooksModule,
		UsersModule,
		SuperModule,
		AuthModule,
		MailsModule,
		SalesModule,
		OrdersModule,
		NotificationsModule,
		WhatsappModule,
		CouponsModule,
		PaymentGateawaysModule,
		JobsModule,
		AnalyticsModule,
		ChatbotsModule
	],
	providers: [ConfigModule],
	controllers: [AppController]
})
export class AppModule {}
