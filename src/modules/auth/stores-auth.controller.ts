import { Body, Controller, Post, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { Response } from "express"

import { AuthService } from "./auth.service"
import { CreateStoreDto } from "./dtos/create-store.dto"
import { PanelLoginDto } from "./dtos/panel-login.dto"

@ApiTags("Auth")
@Controller("stores")
export class StoresAuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	async loginToPanel(@Res() res: Response, @Body() loginDto: PanelLoginDto) {
		const response = await this.authService.loginToPanel(loginDto)
		res.cookie("token", response.accessToken, {
			maxAge: 1000 * 60 * 60 * 24,
			httpOnly: true,
			secure: true
		})
		return res.status(200).json(response)
	}

	@Post("register")
	CreateStore(@Body() createStoreDto: CreateStoreDto) {
		return this.authService.createStore(createStoreDto)
	}
}
