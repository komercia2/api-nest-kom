import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common"
import { Response } from "express"
import { Redes } from "src/entities"

import { GetProductsDtos } from "./dtos/get-productos.dtos"
import { UpdateProductPricingDto } from "./dtos/update-product-pricing"
import { IPolicy } from "./interfaces/policies"
import { IGeolocation } from "./interfaces/zones"
import { PanelService } from "./panel.service"

@Controller()
export class PanelController {
	constructor(private readonly panelService: PanelService) {}

	@Get("get-categorias-subcategories/:storeID")
	getCategoriasSubcategories(@Param("storeID") storeID: number) {
		return this.panelService.getProductCategoriesAndSubcategories(storeID)
	}

	@Put("update-payment-policies/:storeID")
	editPaymentPolicies(@Body("pagos") pagos: string, @Param("storeID") storeID: number) {
		return this.panelService.editPaymentPolicies(storeID, pagos)
	}

	@Get("get-payment-policies/:storeID")
	getPaymentPolicies(@Param("storeID") storeID: number) {
		return this.panelService.getPaymentPolcie(storeID)
	}

	@Put("update-networks/:storeID")
	editNetworks(@Body() networks: Partial<Redes>, @Param("storeID") storeID: number) {
		return this.panelService.editNetworks(storeID, networks)
	}

	@Get("get-networks/:storeID")
	getNetworks(@Param("storeID") storeID: number) {
		return this.panelService.getNetworks(storeID)
	}

	@Put("update-policies/:storeID")
	editPolicies(@Body() policies: Partial<IPolicy>, @Param("storeID") storeID: number) {
		return this.panelService.editPolicies(storeID, policies)
	}

	@Get("get-policies/:storeID")
	getPolicies(@Param("storeID") storeID: number) {
		return this.panelService.getPolicies(storeID)
	}

	@Post("create-geolocation/:storeID")
	createGeolocation(@Param("storeID") storeID: number, @Body() geolocation: IGeolocation) {
		return this.panelService.createGeolocation(storeID, geolocation)
	}

	@Delete("delete-geolocation/:storeID/:geolocationID")
	deleteGeolocation(
		@Param("storeID") storeID: number,
		@Param("geolocationID") geolocationID: number
	) {
		return this.panelService.deleteGeolocation(storeID, geolocationID)
	}

	@Put("geolocation/:storeID/:geolocationID")
	editGeolocation(
		@Param("storeID") storeID: number,
		@Param("geolocationID") geolocationID: number,
		@Body() geolocation: Partial<IGeolocation>
	) {
		return this.panelService.editGeolocation(storeID, geolocationID, geolocation)
	}

	@Get("get-geolocations/:storeID")
	getGeolocations(@Param("storeID") storeID: number) {
		return this.panelService.getGeolocations(storeID)
	}

	@Put("update-product-pricing")
	updateProductPricing(@Body() updateProductPricingDto: UpdateProductPricingDto) {
		return this.panelService.updateProductPricing(updateProductPricingDto)
	}

	@Get("export-sales/:storeID")
	async exportSales(
		@Res() res: Response,
		@Param("storeID") id: string,
		@Query("cartIDs") cartIDs?: Array<string>
	) {
		const { data, filename } = await this.panelService.exportSales(+id, cartIDs)

		res.attachment(filename)
		res.send(data)

		return res
	}

	@Get("export-clients/:storeID")
	async export(
		@Res() res: Response,
		@Param("storeID") id: string,
		@Query("clientIDs") clientIDs?: Array<string>
	) {
		const { data, filename } = await this.panelService.exportClients(+id, clientIDs)

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
