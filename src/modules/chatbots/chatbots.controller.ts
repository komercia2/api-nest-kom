import { Controller, Get, Param, Query } from "@nestjs/common"

import { ChatbotsService } from "./chatbot.service"
import { GetProductsDto } from "./dto/get-products.dto"

@Controller("")
export class ChatbotsController {
	constructor(private readonly chatbotService: ChatbotsService) {}

	@Get("/store/:storeID")
	async getStoreBasicInfo(@Param("storeID") storeID: string) {
		return await this.chatbotService.getStoreBasicInfo(+storeID)
	}

	@Get("/store/:storeID/products")
	async getProducts(@Param("storeID") storeID: number, @Query() query: GetProductsDto) {
		return await this.chatbotService.getProducts(storeID, { ...query })
	}
}
