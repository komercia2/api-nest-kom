import { Inject } from "@nestjs/common"
import { DescuentoRango } from "src/entities"

import { StoreDiscountEntity } from "../../domain/entities"
import { IStoreDiscountRepository } from "../../domain/repositories"
import { MySQLStoreDiscountService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySQLStoreDiscountRepository implements IStoreDiscountRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MySQLStoreDiscountService)
		private readonly storeDiscountService: MySQLStoreDiscountService
	) {}

	async getDiscountsByStoreId(storeId: number): Promise<StoreDiscountEntity[] | null> {
		const discounts = await this.storeDiscountService.getDiscountsByStoreId(storeId)
		return discounts.map(this.toEntity)
	}

	private toEntity = (entity: DescuentoRango): StoreDiscountEntity => ({
		id: entity.id,
		storeId: entity.tiendasId,
		name: entity.nombre,
		discountPercentage: entity.porcentajeDescuento,
		discountValue: entity.valorDescuento,
		productsAmount: entity.cantidadProductos,
		priceRanges: entity.rangosPrecios,
		option: entity.opcion,
		status: entity.estado,
		type: entity.tipo,
		upadatedAt: entity.updatedAt,
		createdAt: entity.createdAt
	})
}
