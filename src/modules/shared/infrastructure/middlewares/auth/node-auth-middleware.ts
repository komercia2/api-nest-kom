import { Injectable, NestMiddleware, Req, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { NextFunction, Request, Response } from "express"

@Injectable()
export class NodeAuthMiddleware implements NestMiddleware {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}
	async use(@Req() req: Request, res: Response, next: NextFunction) {
		const token = req.cookies["token"] || null

		if (!token) throw new UnauthorizedException("Token no encontrado en la cookie")

		try {
			await this.jwtService.verify(token, {
				secret: this.configService.get("PANEL_JWT_SECRET")
			})

			const decoded = this.jwtService.decode(token)

			if (!decoded) {
				{
					throw new UnauthorizedException("Token inválido o expirado")
				}
			}

			req.id = decoded["id"]

			next()
		} catch (err) {
			throw new UnauthorizedException("Token inválido o expirado")
		}
	}
}
