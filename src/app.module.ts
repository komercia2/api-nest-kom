import { CacheModule } from "@nestjs/cache-manager"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { MongooseModule } from "@nestjs/mongoose"
import { TypeOrmModule } from "@nestjs/typeorm"
import { pinoConfig } from "@shared/infrastructure/configs/logs"
import { MongooseConfigService } from "@shared/infrastructure/database/mongoose"
import { TypeOrmService } from "@shared/infrastructure/database/typeorm"
import { RoutesModule } from "@shared/infrastructure/routes"
import { TemplatesModule } from "@templates/templates.module"
import { LoggerModule } from "nestjs-pino"

import { AppController } from "./app.controller"
import { AiSuggetionsModule } from "./modules/ai-suggetions/ai-suggetions.module"
import { CommonModule } from "./modules/common/common.module"
import { HooksModule } from "./modules/hooks/hooks.module"
import { PaymentsModule } from "./modules/payments/payments.module"
import { ProductModule } from "./modules/products/products.module"
import { StoresModule } from "./modules/stores/stores.module"

@Module({
	imports: [
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
		HooksModule
	],
	providers: [ConfigModule],
	controllers: [AppController]
})
export class AppModule {}
