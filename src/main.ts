import { RequestMethod } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { SwaggerModule } from "@nestjs/swagger"
import { getSwaggerConfig } from "@shared/infrastructure/docs"
import * as compression from "compression"
import { Logger } from "nestjs-pino"

import { AppModule } from "./app.module"

async function bootstrap() {
	const app = (await NestFactory.create(AppModule, { bufferLogs: true })).setGlobalPrefix("api}", {
		exclude: [{ path: "/", method: RequestMethod.GET }]
	})

	const configService = app.get(ConfigService)
	const { config, path } = getSwaggerConfig()
	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup(path, app, document, {
		customSiteTitle: "Komercia API Docs",
		swaggerOptions: { docExpansion: "none" },
		useGlobalPrefix: true
	})

	app.useLogger(app.get(Logger))
	app.use(compression())

	await app.listen(configService.get("PORT") || 3000)
}

bootstrap()
