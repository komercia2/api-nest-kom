import { classes } from "@automapper/classes"
import { AutomapperModule } from "@automapper/nestjs"
import { GlobalModule } from "@global/global.module"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { pinoConfig } from "@shared/infrastructure/configs/logs"
import { TypeOrmService } from "@shared/infrastructure/database/typeorm"
import { RoutesModule } from "@shared/infrastructure/routes"
import { LoggerModule } from "nestjs-pino"

import { AppController } from "./app.controller"

@Module({
	imports: [
		LoggerModule.forRoot(pinoConfig),
		ConfigModule.forRoot({
			envFilePath: [".env.development", ".env.production"],
			isGlobal: true
		}),
		// AutomapperModule.forRoot({ strategyInitializer: classes() }),
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmService,
			inject: [ConfigModule]
		}),
		RoutesModule,
		GlobalModule
	],
	providers: [ConfigModule],
	controllers: [AppController]
})
export class AppModule {}
