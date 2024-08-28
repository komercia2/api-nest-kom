import { Controller, Get, Param } from "@nestjs/common"

import { ChatbotsService } from "./chatbot.service"

@Controller("")
export class ChatbotsController {
	constructor(private readonly chatbotService: ChatbotsService) {}

	@Get("/products/:storeID")
	async getStoreProducts(@Param("storeID") storeID: string) {
		return await this.chatbotService.getProducts(+storeID)
	}

	@Get("/store/:storeID")
	async getStoreBasicInfo(@Param("storeID") storeID: string) {
		return await this.chatbotService.getBasicInfo(+storeID)
	}
}
