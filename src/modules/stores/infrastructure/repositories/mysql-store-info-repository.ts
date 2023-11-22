import { Inject } from "@nestjs/common"
import { EntidadesTiendas, Tiendas } from "src/entities"

import { IStoreInfoRepository } from "../../domain/repositories"
import { MySQLStoreInfoService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySQLStoreInfoRepository implements IStoreInfoRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MysqlStoreInfoService)
		private readonly storeInfoService: MySQLStoreInfoService
	) {}

	async getStoreEntity(storeId: number): Promise<{ entidad: number; nombre: string } | null> {
		const storeEntity = await this.storeInfoService.getStoreEntity(storeId)
		if (!storeEntity) return null

		return { entidad: storeEntity.entidad_id, nombre: storeEntity.entidad_nombre }
	}

	async getStoresInfoByEntityId(entityId: number): Promise<EntidadesTiendas[]> {
		return await this.storeInfoService.getStoresInfoByEntityId(entityId)
	}

	async getStoreInfo(storeId: number): Promise<Tiendas | null> {
		return await this.storeInfoService.getStoreInfo(storeId)
	}
}
