import { Inject, Injectable } from "@nestjs/common"
import { IWebSitesRepository } from "@templates/domain/repositories"

import { ApplicationInjectionTokens } from "../application-injection.tokens"

@Injectable()
export class IncrementViewsCommand {
	constructor(
		@Inject(ApplicationInjectionTokens.IWebSiteRepository)
		private readonly webSitesRepository: IWebSitesRepository
	) {}

	async execute(storeId: number): Promise<boolean> {
		return await this.webSitesRepository.incrementViews(storeId)
	}
}
