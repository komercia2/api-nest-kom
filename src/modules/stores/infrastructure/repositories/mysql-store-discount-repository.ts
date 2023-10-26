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
		tiendas_id: entity.tiendasId,
		nombre: entity.nombre,
		porcentaje_descuento: entity.porcentajeDescuento,
		valor_descuento: entity.valorDescuento,
		cantidad_productos: entity.cantidadProductos,
		rangos_precios: entity.rangosPrecios,
		opcion: entity.opcion,
		estado: entity.estado,
		tipo: entity.tipo,
		updated_at: entity.updatedAt,
		created_at: entity.createdAt
	})
}
