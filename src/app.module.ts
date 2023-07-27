import { GlobalModule } from "@global/global.module"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
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

@Module({
	imports: [
		LoggerModule.forRoot(pinoConfig),
		ConfigModule.forRoot({
			envFilePath: [".env.development", ".env.production"],
			isGlobal: true
		}),
		TypeOrmModule.forRootAsync({ useClass: TypeOrmService, inject: [ConfigModule] }),
		MongooseModule.forRootAsync({ useClass: MongooseConfigService, inject: [ConfigModule] }),
		RoutesModule,
		GlobalModule,
		AiSuggetionsModule,
		TemplatesModule
	],
	providers: [ConfigModule],
	controllers: [AppController]
})
export class AppModule {}
