import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Carritos, TiendaMercadoPagoInfo } from "src/entities"
import { Repository } from "typeorm"

@Injectable()
export class MySQLMercadopagoService {
	constructor(
		@InjectRepository(Carritos)
		private readonly cartRepository: Repository<Carritos>,

		@InjectRepository(TiendaMercadoPagoInfo)
		private readonly mercadopagoInfoRepository: Repository<TiendaMercadoPagoInfo>
	) {}

	async getCartProducts(cartId: number) {
		const cart = await this.cartRepository.findOne({
			where: { id: cartId },
			relations: {
				productosCarritos: {
					producto2: {
						productosInfo: true
					}
				},
				usuario2: true
			}
		})
		return cart
	}

	async getMercadopagoInfo(storeId: number) {
		const mercadopagoInfo = await this.mercadopagoInfoRepository.findOne({
			where: { idTienda: storeId }
		})
		return mercadopagoInfo
	}

	async updateCartState(cartId: number, state: string) {
		await this.cartRepository.update({ id: cartId }, { estado: state })
	}
}
