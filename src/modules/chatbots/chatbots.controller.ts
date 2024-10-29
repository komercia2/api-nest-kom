import { Body, Controller, Get, Param, Post } from "@nestjs/common"

import { ChatbotsService } from "./chatbot.service"

@Controller("")
export class ChatbotsController {
	constructor(private readonly chatbotService: ChatbotsService) {}

	@Post("/products/details/ids")
	async getProductsDetailedByIds(@Body() body: { storeID: number; ids: number[] }) {
		return await this.chatbotService.getProductsDetailedByIDs(body.storeID, body.ids)
	}

	@Get("/products/details/:storeID")
	async getProductsDetailed(@Param("storeID") storeID: string) {
		return await this.chatbotService.getProductsDetailed(+storeID)
	}

	@Get("/product/:productID")
	async getProductInfo(@Param("productID") productID: string) {
		return await this.chatbotService.getProductInfo(+productID)
	}

	@Get("/products/:storeID")
	async getStoreProducts(@Param("storeID") storeID: string) {
		return await this.chatbotService.getProducts(+storeID)
	}

	@Get("/store/:storeID")
	async getStoreBasicInfo(@Param("storeID") storeID: string) {
		return await this.chatbotService.getBasicInfo(+storeID)
	}
}
