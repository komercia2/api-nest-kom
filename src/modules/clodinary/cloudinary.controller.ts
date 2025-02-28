import { Controller, Param, Put } from "@nestjs/common"

import { ClodinaryService } from "./clodinary.service"

@Controller()
export class CloudinaryController {
	constructor(private readonly cloudinaryService: ClodinaryService) {}

	@Put("sync-store-logo/:storeID")
	syncStoreLogo(@Param("storeID") storeID: number) {
		return this.cloudinaryService.syncStoreLogo(storeID)
	}
}
