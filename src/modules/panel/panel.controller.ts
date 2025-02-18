import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common"

import { GetProductsDtos } from "./dtos/get-productos.dtos"
import { PanelService } from "./panel.service"

@Controller()
export class PanelController {
	constructor(private readonly panelService: PanelService) {}

	@Put("update-delivery-status/:deliveryStatusID/:cartID")
	updateDeliveryStatus(
		@Param("deliveryStatusID") deliveryStatusID: number,
		@Param("cartID") cartID: number
	) {
		return this.panelService.updateDeliveryStatus(deliveryStatusID, cartID)
	}

	@Get("get-delivery-status")
	getDeliveryStatus() {
		return this.panelService.getDeliveryStatus()
	}

	@Get("get-short-aux-description/:productID")
	getShortAuxDescription(@Param("productID") productID: number) {
		return this.panelService.getShortAuxDescription(productID)
	}

	@Put("update-short-aux-description/:productID")
	updateShortAuxDescription(
		@Param("productID") productID: number,
		@Body("shortAuxDescription") shortAuxDescription: string
	) {
		return this.panelService.updateShortAuxDescription(productID, shortAuxDescription)
	}

	@Get("filter-products/:storeID")
	getProductos(@Param("storeID") storeID: number, @Query() getProductsDtos: GetProductsDtos) {
		return this.panelService.getProductos(storeID, getProductsDtos)
	}
}
