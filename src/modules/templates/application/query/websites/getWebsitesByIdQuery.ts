import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { IWebSitesRepository } from "@templates/domain/repositories"

@Injectable()
export class GetWebsitesByIdQuery {
	constructor(
		@Inject(ApplicationInjectionTokens.IWebSiteRepository)
		private readonly websiteRepository: IWebSitesRepository
	) {}

	async getWebSiteByDomain(storeId: number) {
		return await this.websiteRepository.getWebSiteListByStoreId(storeId)
	}
}
