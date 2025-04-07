import { RequestMethod, ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { SwaggerModule } from "@nestjs/swagger"
import { getSwaggerConfig } from "@shared/infrastructure/docs"
import { json, urlencoded } from "body-parser"
import * as compression from "compression"
import * as cookieParser from "cookie-parser"
import { Logger } from "nestjs-pino"

import { AppModule } from "./app.module"

async function bootstrap() {
	const app = (await NestFactory.create(AppModule, { bufferLogs: true })).setGlobalPrefix("api", {
		exclude: [{ path: "/", method: RequestMethod.GET }]
	})

	const configService = app.get(ConfigService)

	app.enableCors()
	app.use(json({ limit: "50mb" }))
	app.use(urlencoded({ limit: "50mb", extended: true }))

	const { config, path } = getSwaggerConfig()
	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup(path, app, document, {
		customSiteTitle: "Komercia API Docs",
		swaggerOptions: { docExpansion: "none" },
		useGlobalPrefix: true
	})

	const expressInstance = app.getHttpAdapter().getInstance()

	expressInstance.disable("x-powered-by")

	app.useGlobalPipes(new ValidationPipe())
	app.useLogger(app.get(Logger))
	app.use(cookieParser())
	app.use(compression())

	await app.listen(configService.get<number>("PORT") || 3000)
}

bootstrap()
