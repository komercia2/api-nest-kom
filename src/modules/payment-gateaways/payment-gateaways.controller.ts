import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common"

import { AddiService } from "./addi.service"
import { SaveAddiCredentialsDto } from "./dtos/save-addi-credentials.dto"

@Controller()
export class PaymentGateawaysController {
	constructor(private readonly addiService: AddiService) {}

	@Post("addi/auth/oauth/staging")
	async getStagingAddiOAut() {
		return this.addiService.getStagingAddiOAuth()
	}

	@Put("addi/auth/activate/:storeId")
	activateAddiIntegration(@Param("storeId") storeId: number) {
		return this.addiService.activateIntegration(storeId)
	}

	@Put("addi/auth/deactivate/:storeId")
	deactivateAddiIntegration(@Param("storeId") storeId: number) {
		return this.addiService.deactivateIntegration(storeId)
	}

	@Post("addi/auth/credentials")
	saveAddiCredentials(@Body() saveAddiCredentialsDto: SaveAddiCredentialsDto) {
		return this.addiService.saveAddiCredentials(saveAddiCredentialsDto)
	}

	@Get("addi/auth/credentials/:storeId")
	getAddiCredentials(@Param("storeId") storeId: number) {
		return this.addiService.getStoreCredentials(storeId)
	}
}
