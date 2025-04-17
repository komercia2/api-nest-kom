import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common"
import { Response } from "express"
import { DisenoModal, Redes } from "src/entities"

import { PaginationDto } from "../users/infrastructure/dtos/paginatation.dto"
import { GetProductsDtos } from "./dtos/get-productos.dtos"
import { UpdateProductPricingDto } from "./dtos/update-product-pricing"
import { IBlog } from "./interfaces/blog"
import { IProductCategorie } from "./interfaces/categories"
import { ICoupon } from "./interfaces/coupon"
import { ICustomerAccessCode } from "./interfaces/customer-access-code"
import { IDiscount } from "./interfaces/discount"
import { IPolicy } from "./interfaces/policies"
import { ICreateProductSubcategorie } from "./interfaces/subcategories"
import { IWapiTemplate } from "./interfaces/wapi"
import { IGeolocation } from "./interfaces/zones"
import { PanelService } from "./panel.service"

@Controller()
export class PanelController {
	constructor(private readonly panelService: PanelService) {}

	@Delete("delete-blog/:storeID/:blogID")
	deleteBlog(@Param("storeID") storeID: number, @Param("blogID") blogID: string) {
		return this.panelService.deleteBlog(storeID, blogID)
	}

	@Put("update-blog/:storeID/:blogID")
	updateBlog(
		@Param("storeID") storeID: number,
		@Param("blogID") blogID: string,
		@Body() data: Partial<Omit<IBlog, "id" | "tiendasId">>
	) {
		return this.panelService.updateBlog(storeID, blogID, data)
	}

	@Post("blog/:storeID")
	createBlog(@Param("storeID") storeID: number, @Body() data: Omit<IBlog, "id" | "tiendasId">) {
		return this.panelService.createBlog(storeID, data)
	}

	@Get("blogs/:storeID")
	TiendaBlogs(@Param("storeID") storeID: number, @Query() pagination: PaginationDto) {
		return this.panelService.getStoreBlogs(storeID, pagination)
	}

	@Get("contact-messages/:storeID")
	getContactMessages(@Param("storeID") storeID: number, @Query() pagination: PaginationDto) {
		return this.panelService.getContactMessages(storeID, pagination)
	}

	@Get("get-subscriptions/:storeID")
	getSubscriptions(@Param("storeID") storeID: number, @Query() pagination: PaginationDto) {
		return this.panelService.getStoreSubscribers(storeID, pagination)
	}

	@Delete("delete-customer-access-code/:storeID/:codeID")
	deleteCustomerAccessCode(@Param("storeID") storeID: number, @Param("codeID") codeID: string) {
		return this.panelService.deleteCustomerAccessCode(storeID, codeID)
	}

	@Put("update-customer-access-code/:storeID/:codeID")
	updateCustomerAccessCode(
		@Param("storeID") storeID: number,
		@Param("codeID") codeID: string,
		@Body() data: Partial<Omit<ICustomerAccessCode, "id" | "tiendasId">>
	) {
		return this.panelService.updateCustomerAccessCode(storeID, codeID, data)
	}

	@Get("get-customer-access-code/:storeID")
	getCustomerAccessCode(@Param("storeID") storeID: number) {
		return this.panelService.getCustomerAccessCode(storeID)
	}

	@Put("update-security-modal-settings/:storeID")
	updateSecurityModalSettings(
		@Param("storeID") storeID: number,
		@Body() data: Partial<Omit<DisenoModal, "tiendasId" | "id">>
	) {
		return this.panelService.updateSecurityModalSettings(storeID, data)
	}

	@Get("get-security-modal-settings/:storeID")
	getSecurityModalSettings(@Param("storeID") storeID: number) {
		return this.panelService.getSecurityModalSettings(storeID)
	}

	@Delete("delete-discount/:storeID/:couponID")
	deleteDiscount(@Param("storeID") storeID: number, @Param("discountID") discountID: string) {
		return this.panelService.deleteDiscount(storeID, discountID)
	}

	@Put("update-discount/:storeID/:couponID")
	updateDiscount(
		@Param("storeID") storeID: number,
		@Param("discountID") discountID: string,
		@Body() data: IDiscount
	) {
		return this.panelService.updateDiscount(storeID, discountID, data)
	}

	@Post("create-discount/:storeID")
	createDiscount(@Param("storeID") storeID: number, @Body() data: IDiscount) {
		return this.panelService.createDiscount(storeID, data)
	}

	@Get("get-discounts/:storeID")
	getDiscountList(@Param("storeID") storeID: number) {
		return this.panelService.getDiscountList(storeID)
	}

	@Delete("delete-coupon/:storeID/:couponID")
	deleteCoupon(@Param("storeID") storeID: number, @Param("couponID") couponID: string) {
		return this.panelService.deleteCoupon(storeID, couponID)
	}

	@Put("update-coupon/:storeID/:couponID")
	updateCoupon(
		@Param("storeID") storeID: number,
		@Param("couponID") couponID: string,
		@Body() data: ICoupon
	) {
		return this.panelService.updateCoupon(storeID, couponID, data)
	}

	@Post("create-coupon/:storeID")
	createCoupon(@Param("storeID") storeID: number, @Body() data: ICoupon) {
		return this.panelService.createCoupon(storeID, data)
	}

	@Get("get-coupons/:storeID")
	getCoupons(@Param("storeID") storeID: number) {
		return this.panelService.getCouponList(storeID)
	}

	@Put("update-whatsapp-dynamic-checkout-settings/:storeID")
	updateWhatsappCheckoutDynamicSettings(
		@Param("storeID") storeID: number,
		@Body("configuration") configuration: string
	) {
		return this.panelService.updateWhatsappCheckoutDynamicSettings(storeID, configuration)
	}

	@Get("get-whatsapp-dynamic-checkout-settings/:storeID")
	getWhatsappCheckoutDynamicSettings(@Param("storeID") storeID: number) {
		return this.panelService.getWhatsappCheckoutDynamicSettings(storeID)
	}

	@Put("update-wapi-settings/:storeID")
	updateWapiSettings(@Param("storeID") storeID: number, @Body() data: IWapiTemplate) {
		return this.panelService.updateWapiSettings(storeID, data)
	}

	@Get("get-wapi-settings/:storeID")
	getWapiSettings(@Param("storeID") storeID: number) {
		return this.panelService.getWapiSettings(storeID)
	}

	@Put("update-product-state/:storeID")
	updateProductState(
		@Param("storeID") storeID: number,
		@Body("id") id: number,
		@Body("estado") estado: boolean
	) {
		return this.panelService.updateProductState(storeID, id, estado)
	}

	@Put("update-product-subcategory/:storeID/:subcategoryID")
	editProductSubcategory(
		@Param("storeID") storeID: number,
		@Param("subcategoryID") subcategoryID: number,
		@Body() productSubcategory: ICreateProductSubcategorie
	) {
		return this.panelService.editProductSubcategory(storeID, subcategoryID, productSubcategory)
	}
	@Put("update-product-category/:storeID/:categoryID")
	editProductCategory(
		@Param("storeID") storeID: number,
		@Param("categoryID") categoryID: number,
		@Body() productCategory: IProductCategorie
	) {
		return this.panelService.editProductCategory(storeID, categoryID, productCategory)
	}

	@Delete("delete-product-subcategory/:storeID/:subcategoryID")
	deleteProductSubcategory(
		@Param("storeID") storeID: number,
		@Param("subcategoryID") subcategoryID: number
	) {
		return this.panelService.deleteProductSubcategory(storeID, subcategoryID)
	}

	@Post("create-product-subcategory/:storeID")
	createProductSubcategory(
		@Param("storeID") storeID: number,
		@Body() productSubcategory: ICreateProductSubcategorie
	) {
		return this.panelService.createProductSubcategory(storeID, productSubcategory)
	}

	@Delete("delete-product-category/:storeID/:categoryID")
	deleteProductCategory(
		@Param("storeID") storeID: number,
		@Param("categoryID") categoryID: number
	) {
		return this.panelService.deleteProductCategory(storeID, categoryID)
	}

	@Post("create-product-category/:storeID")
	createProductCategory(
		@Param("storeID") storeID: number,
		@Body() productCategory: IProductCategorie
	) {
		return this.panelService.createProductCategory(storeID, productCategory)
	}

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
