import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { WhatsappCheckout } from "src/entities"
import { Repository } from "typeorm"

import { StoreWhatsappCheckoutEntity } from "../../domain/entities"

@Injectable()
export class MySQLStoreWhatsappCheckoutService {
	constructor(
		@InjectRepository(WhatsappCheckout)
		private readonly whatsappCheckoutRepository: Repository<WhatsappCheckout>
	) {}

	async getStoreWhatsAppCheckout(storeId: number) {
		const whatsappCheckout = await this.whatsappCheckoutRepository
			.createQueryBuilder("whatsapp_checkout")
			.where("whatsapp_checkout.tiendasId = :storeId", { storeId })
			.select([
				"whatsapp_checkout.id",
				"whatsapp_checkout.configuration",
				"whatsapp_checkout.tiendasId",
				"whatsapp_checkout.createdAt",
				"whatsapp_checkout.updatedAt"
			])
			.getOne()

		if (!whatsappCheckout) return null

		return this.toEntity(whatsappCheckout)
	}

	private toEntity = (whatsappCheckout: WhatsappCheckout): StoreWhatsappCheckoutEntity => ({
		...whatsappCheckout
	})
}
