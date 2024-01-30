import { RequestMethod, ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { SwaggerModule } from "@nestjs/swagger"
import { getSwaggerConfig } from "@shared/infrastructure/docs"
import * as compression from "compression"
import { Logger } from "nestjs-pino"
import * as qrcode from "qrcode-terminal"
import { useNestTreblle } from "treblle"

import { AppModule } from "./app.module"
import { WhatsappService } from "./modules/whatsapp/whatsapp.service"

async function bootstrap() {
	const app = (await NestFactory.create(AppModule, { bufferLogs: true })).setGlobalPrefix("api", {
		exclude: [{ path: "/", method: RequestMethod.GET }]
	})

	const configService = app.get(ConfigService)
	app.enableCors()
	const { config, path } = getSwaggerConfig()
	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup(path, app, document, {
		customSiteTitle: "Komercia API Docs",
		swaggerOptions: { docExpansion: "none" },
		useGlobalPrefix: true
	})

	const expressInstance = app.getHttpAdapter().getInstance()

	expressInstance.disable("x-powered-by")

	if (configService.get<string>("NODE_ENV") === "production") {
		useNestTreblle(expressInstance, {
			apiKey: configService.get<string>("TREBLLE_API_KEY") || "",
			projectId: configService.get<string>("TREBLLE_PROJECT_ID") || ""
		})
	}

	app.useGlobalPipes(new ValidationPipe())
	app.useLogger(app.get(Logger))
	app.use(compression())

	/**
	 * Whatsapp Service Initialization [Required for QR Code]
	 */
	const whatsappService = app.get(WhatsappService)
	const logger = app.get(Logger)
	whatsappService.instance.on("qr", (qr) => {
		logger.log("QR RECEIVED")
		qrcode.generate(qr, { small: true })
	})

	whatsappService.instance.on("ready", async () => {
		logger.log("Client is ready!")
	})

	whatsappService.instance.initialize()

	await app.listen(configService.get<number>("PORT") || 3000)
}

bootstrap()
