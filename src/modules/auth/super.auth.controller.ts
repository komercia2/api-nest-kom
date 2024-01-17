import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common"
import { SuperJwtAuthGuard } from "@shared/infrastructure/guards"
import { Request } from "express"

import { AuthService } from "./auth.service"
import { SuperLoginDto } from "./dtos"

@Controller("super")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	SuperLoginDto(@Body() superLoginDto: SuperLoginDto) {
		return this.authService.loginToSuper(superLoginDto)
	}

	@UseGuards(SuperJwtAuthGuard)
	@Get("me")
	getSuperUserById(@Req() req: Request) {
		const id = req.superUser?.id
		return this.authService.getSuperUserById(id)
	}
}
