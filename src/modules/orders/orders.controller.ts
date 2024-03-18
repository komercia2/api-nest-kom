import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

import { CreateOrderDto } from "./dtos/create-order-dto"
import { GetOrderDto } from "./dtos/get-order-dto"
import { OrdersService } from "./orders.service"

@ApiTags("orders")
@Controller()
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Get(":orderId/:storeId/:userId")
	async getOrder(@Param() getOrderDto: GetOrderDto) {
		return this.ordersService.getOrder(getOrderDto)
	}

	@Post()
	createOrder(@Body() createOrderDto: CreateOrderDto) {
		return this.ordersService.createOrder(createOrderDto)
	}
}
