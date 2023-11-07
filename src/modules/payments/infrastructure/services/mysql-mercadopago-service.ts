import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Carritos } from "src/entities"
import { Repository } from "typeorm"

@Injectable()
export class MySQLMercadopagoService {
	constructor(
		@InjectRepository(Carritos)
		private readonly cartRepository: Repository<Carritos>
	) {}

	async getCartProducts(cartId: number) {
		const preference = await this.cartRepository.findOne({
			where: { id: cartId }
		})
		return preference
	}
}
