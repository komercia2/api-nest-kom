import { Inject, Injectable } from "@nestjs/common"

import { IStoreGeolocationRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class GetStoreGeolocationsQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreGeolocationRepository)
		private readonly storeGeolocationRepository: IStoreGeolocationRepository
	) {}

	async execute(storeId: number) {
		return this.storeGeolocationRepository.getStoreGeolocation(storeId)
	}
}
