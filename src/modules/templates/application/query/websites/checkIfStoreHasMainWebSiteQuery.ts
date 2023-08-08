import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { IWebSitesRepository } from "@templates/domain/repositories"

@Injectable()
export class CheckIfStoreHasMainWebSiteQuery {
	constructor(
		@Inject(ApplicationInjectionTokens.IWebSiteRepository)
		private readonly websiteRepository: IWebSitesRepository
	) {}

	async execute(storeId: number): Promise<boolean> {
		return await this.websiteRepository.checkIfStoreHasMainWebSite(storeId)
	}
}
