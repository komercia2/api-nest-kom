import { DocumentBuilder } from "@nestjs/swagger"

/**
 * @name getSwaggerConfig
 * @returns { path: string, config: DocumentBuilder }
 * @description Method to get the swagger config for the API documentation
 */
export const getSwaggerConfig = () => {
	const path = process.env.SWAGGER_PATH || "api"
	const swaggerConfig = new DocumentBuilder()
		.setTitle("Komercia NestJS API")
		.setDescription("This is the API documentation for the Komercia NestJS API")
		.setVersion("1.0")
		.build()
	return {
		path: path,
		config: swaggerConfig
	}
}
