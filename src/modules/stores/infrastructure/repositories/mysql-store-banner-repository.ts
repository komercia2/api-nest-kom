import { Inject } from "@nestjs/common"

import { StoreBannerEntity } from "../../domain/entities"
import { IStoreBannerRepository } from "../../domain/repositories"
import { MySQLStoreBannerService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySQLStoreBannerRepository implements IStoreBannerRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MySQLStoreBannerService)
		private readonly storeBannerService: MySQLStoreBannerService
	) {}

	async getStoreBanners(storeId: number): Promise<StoreBannerEntity[]> {
		return this.storeBannerService.getStoreBanners(storeId)
	}
}
