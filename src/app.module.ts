import { classes } from "@automapper/classes"
import { AutomapperModule } from "@automapper/nestjs"
import { GlobalModule } from "@global/global.module"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { pinoConfig } from "@shared/infrastructure/configs/logs"
import { RoutesModule } from "@shared/infrastructure/routes"
import { LoggerModule } from "nestjs-pino"

import { AppController } from "./app.controller"
import { typeOrmConfig } from "./typeorm.config"

@Module({
	imports: [
		LoggerModule.forRoot(pinoConfig),
		AutomapperModule.forRoot({ strategyInitializer: classes() }),
		TypeOrmModule.forRoot(typeOrmConfig),
		RoutesModule,
		GlobalModule
	],
	controllers: [AppController]
})
export class AppModule {}
