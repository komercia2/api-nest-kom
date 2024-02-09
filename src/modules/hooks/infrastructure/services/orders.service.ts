import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Logger } from "nestjs-pino"
import { Carritos } from "src/entities"
import { Repository } from "typeorm"

import { AddiHookEntity } from "../../domain/entities"

@Injectable()
export class OrdersService {
	constructor(
		@InjectRepository(Carritos) private carritosRepository: Repository<Carritos>,
		private readonly logger: Logger
	) {}

	async processAddiApplicationStatus(order: AddiHookEntity): Promise<void> {
		try {
			this.logger.log(`Processing addi application status for order ${JSON.stringify(order)}`)
			this.logger.log(`Order ${order.orderId} processed successfully`)
		} catch (error) {
			this.logger.error(`Error processing addi application status , ${error}`)
		}
	}
}
