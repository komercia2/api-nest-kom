import { Controller, Get, Param, Query } from "@nestjs/common"

import { GetProductsDtos } from "./dtos/get-productos.dtos"
import { PanelService } from "./panel.service"

@Controller()
export class PanelController {
	constructor(private readonly panelService: PanelService) {}

	@Get("filter-products/:storeID")
	getProductos(@Param("storeID") storeID: number, @Query() getProductsDtos: GetProductsDtos) {
		return this.panelService.getProductos(storeID, getProductsDtos)
	}
}
