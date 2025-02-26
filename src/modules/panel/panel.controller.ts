import { Body, Controller, Get, Param, Put, Query, Res } from "@nestjs/common"
import { Response } from "express"

import { GetProductsDtos } from "./dtos/get-productos.dtos"
import { PanelService } from "./panel.service"

@Controller()
export class PanelController {
	constructor(private readonly panelService: PanelService) {}

	@Get("export-clients/:storeID")
	async export(
		@Res() res: Response,
		@Param("storeID") id: string,
		@Query("currency") currency = "COP",
		@Query("clientIDs") clientIDs?: Array<string>
	) {
		const { data, filename } = await this.panelService.exportClients(+id, currency, clientIDs)

		res.attachment(filename)
		res.send(data)

		return res
	}

	@Put("delete-product-delivery-status/:cartID")
	deleteProductDeliveryStatus(@Param("cartID") cartID: number) {
		return this.panelService.deleteProductDeliveryStatus(cartID)
	}

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
