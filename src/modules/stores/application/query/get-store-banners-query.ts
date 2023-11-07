import { Inject, Injectable } from "@nestjs/common"

import { IStoreBannerRepository } from "../../domain/repositories"
import { StoresApplicationInjectionTokens } from "../stores-application-injection-tokens"

@Injectable()
export class GetStoreBannersQuery {
	constructor(
		@Inject(StoresApplicationInjectionTokens.IStoreBannerRepository)
		private readonly storeBannerRepository: IStoreBannerRepository
	) {}

	async execute(storeId: number) {
		return await this.storeBannerRepository.getStoreBanners(storeId)
	}
}
