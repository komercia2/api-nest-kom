import { HttpStatus, Injectable, NestMiddleware, Req } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { handlerHttpResponse } from "@shared/infrastructure/handlers"
import { NextFunction, Request, Response } from "express"

@Injectable()
export class PublicApiKeyAuthMiddleware implements NestMiddleware {
	constructor(private readonly configService: ConfigService) {}

	async use(@Req() req: Request, res: Response, next: NextFunction) {
		try {
			const { komercia_public_routes_key } = req.headers
			console.log(req.headers)

			if (!komercia_public_routes_key) {
				handlerHttpResponse(res, {
					data: null,
					message: "Public api key not found",
					statusCode: HttpStatus.BAD_REQUEST,
					success: false
				})
				return
			}

			const publicApiKeyFromEnv = this.configService.get<string>("KOMERCIA_PUBLIC_ROUTES_KEY")

			if (komercia_public_routes_key !== publicApiKeyFromEnv) {
				handlerHttpResponse(res, {
					data: null,
					message: "Invalid public api key",
					statusCode: HttpStatus.UNAUTHORIZED,
					success: false
				})
				return
			}

			next()
		} catch (error) {
			handlerHttpResponse(res, {
				data: null,
				message: "Error validating public api key",
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				success: false
			})
		}
	}
}
