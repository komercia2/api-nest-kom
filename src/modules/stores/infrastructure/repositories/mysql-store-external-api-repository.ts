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
		tienda_id: entity.tiendaId,
		facebook: entity.facebook,
		analytics: entity.analytics,
		facebook_chat: entity.facebookChat,
		facebook_pixel_metatag_1: entity.facebookPixelMetatag_1,
		google_merchant: entity.googleMerchant,
		mercadolibre: entity.mercadolibre,
		pixel_facebook: entity.pixelFacebook,
		tag_manager: entity.tagManager,
		tidio_user: entity.tidioUser,
		addiAllySlug: entity.addiAllySlug
	})
}
