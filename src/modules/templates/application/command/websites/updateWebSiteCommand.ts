import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { StoreAlreadyHasMainWebSiteException } from "@templates/domain/exceptions"
import { IWebSitesRepository } from "@templates/domain/repositories"

import { UpdateWebSiteDto } from "../dtos"

@Injectable()
export class UpdateWebSiteCommand {
	constructor(
		@Inject(ApplicationInjectionTokens.IWebSiteRepository)
		private readonly websiteRepository: IWebSitesRepository
	) {}

	async execute(_id: string, storeId: number, updateWebsiteDto: UpdateWebSiteDto) {
		const { isMain } = updateWebsiteDto

		if (isMain) {
			const storeHasMainWebsite = await this.websiteRepository.checkIfStoreHasMainWebSite(storeId)
			if (storeHasMainWebsite) {
				throw new StoreAlreadyHasMainWebSiteException("Store already has a main website")
			}
		}
		return await this.websiteRepository.updateWebsiteInfo(_id, updateWebsiteDto)
	}
}
