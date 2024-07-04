import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { CheckoutJwtGuard } from "@shared/infrastructure/guards"

import { CreateOrderDto } from "./dtos/create-order-dto"
import { CreatePayUOrderDto } from "./dtos/create-payu-order.dto"
import { GetOrderDto } from "./dtos/get-order-dto"
import { UpdateOrderStatusDto } from "./dtos/update-order-status.dto"
import { OrdersService } from "./orders.service"

@ApiTags("orders")
@Controller()
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@UseGuards(CheckoutJwtGuard)
	@Post("create-payu-order")
	async createPayuOrder(@Body() createPayUOrderDto: CreatePayUOrderDto) {
		return this.ordersService.cratePayUOrder(createPayUOrderDto)
	}

	@UseGuards(CheckoutJwtGuard)
	@Put("update-order-status")
	async updateOrderStatus(@Body() updateOrderStatusDto: UpdateOrderStatusDto) {
		return this.ordersService.updateOrderStatus(updateOrderStatusDto)
	}

	@Get(":orderId/:storeId/:userId")
	async getOrder(@Param() getOrderDto: GetOrderDto) {
		return this.ordersService.getOrder(getOrderDto)
	}

	@Post()
	createOrder(@Body() createOrderDto: CreateOrderDto) {
		return this.ordersService.createOrder(createOrderDto)
	}
}
