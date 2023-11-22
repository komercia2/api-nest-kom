import { Inject } from "@nestjs/common"

import { StoreGeolocationEntity } from "../../domain/entities"
import { IStoreGeolocationRepository } from "../../domain/repositories"
import { MySQLStoreGeolocationService } from "../services"
import { StoresInfrastructureInjectionTokens } from "../store-infrastructure-injection-tokens"

export class MySQLStoreGeolocationRepository implements IStoreGeolocationRepository {
	constructor(
		@Inject(StoresInfrastructureInjectionTokens.MySQLStoreGeolocationService)
		private readonly storeGeolocationService: MySQLStoreGeolocationService
	) {}

	async getStoreGeolocation(storeId: number): Promise<StoreGeolocationEntity[]> {
		return await this.storeGeolocationService.getStoreGeolocations(storeId)
	}
}
