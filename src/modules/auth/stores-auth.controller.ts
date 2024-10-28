import { Body, Controller, Post } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

import { AuthService } from "./auth.service"
import { CreateStoreDto } from "./dtos/create-store.dto"

@ApiTags("Auth")
@Controller("stores")
export class StoresAuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("register")
	CreateStore(@Body() createStoreDto: CreateStoreDto) {
		return this.authService.createStore(createStoreDto)
	}
}
