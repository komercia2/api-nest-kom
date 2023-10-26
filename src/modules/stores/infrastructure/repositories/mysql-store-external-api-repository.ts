import { Inject } from "@nestjs/common"
import { ApisConexiones } from "src/entities"

import { StoreExternalApi } from "../../domain/entities"
import { IStoreExternalApiRepository } from "../../domain/repositories"
import { MySQLStoreExternalApiService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySQLStoreExternalApiRepository implements IStoreExternalApiRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MySQLStoreExternalApiService)
		private readonly mysqlStoreExternalApiService: MySQLStoreExternalApiService
	) {}

	async getStoreExternalApis(storeId: number): Promise<StoreExternalApi | null> {
		const storeExternalApi = await this.mysqlStoreExternalApiService.getStoreExternalApis(storeId)
		return storeExternalApi ? this.toEntity(storeExternalApi) : null
	}

	private toEntity = (entity: ApisConexiones): StoreExternalApi => ({
		storeId: entity.tiendaId,
		facebook: entity.facebook,
		analytics: entity.analytics,
		facebookChat: entity.facebookChat,
		facebookPixelMetatag1: entity.facebookPixelMetatag_1,
		googleMerchant: entity.googleMerchant,
		mercadolibre: entity.mercadolibre,
		pixelFacebook: entity.pixelFacebook,
		tagManager: entity.tagManager,
		tidioUser: entity.tidioUser
	})
}
