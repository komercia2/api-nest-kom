import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Carritos, TiendaMercadoPagoInfo } from "src/entities"
import { Repository } from "typeorm"

import { MercadopagoStoreInfoEntity } from "../../domain/entities"

@Injectable()
export class MySQLMercadopagoService {
	constructor(
		@InjectRepository(Carritos)
		private readonly cartRepository: Repository<Carritos>,

		@InjectRepository(TiendaMercadoPagoInfo)
		private readonly mercadopagoInfoRepository: Repository<TiendaMercadoPagoInfo>
	) {}

	async createIntgration(storeId: number, data: MercadopagoStoreInfoEntity) {
		const exist = await this.mercadopagoInfoRepository.findOne({
			where: { idTienda: storeId }
		})

		if (exist) {
			await this.mercadopagoInfoRepository.save({ ...data, idTienda: storeId })
			return
		}

		await this.mercadopagoInfoRepository.update({ idTienda: storeId }, data)
	}

	async updateMercadopagoInfo(storeId: number, data: MercadopagoStoreInfoEntity) {
		await this.mercadopagoInfoRepository.update({ idTienda: storeId }, data)
	}

	async getCartProducts(cartId: number) {
		const cart = await this.cartRepository.findOne({
			where: { id: cartId },
			relations: {
				productosCarritos: { producto2: { productosInfo: true } },
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

	async getStoreIdByCartId(cartId: number) {
		const cart = await this.cartRepository.findOne({
			where: { id: cartId }
		})
		return cart?.tienda
	}
}
