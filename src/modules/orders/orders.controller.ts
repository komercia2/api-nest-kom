import { Body, Controller, Post } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

import { CreateOrderDto } from "./dtos/create-order-dto"
import { OrdersService } from "./orders.service"

@ApiTags("orders")
@Controller()
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	createOrder(@Body() createOrderDto: CreateOrderDto) {
		return this.ordersService.createOrder(createOrderDto)
	}
}
