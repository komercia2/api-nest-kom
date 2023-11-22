import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { IWebSitesRepository } from "@templates/domain/repositories"

@Injectable()
export class GetWebsiteQuery {
	constructor(
		@Inject(ApplicationInjectionTokens.IWebSiteRepository)
		private readonly websiteRepository: IWebSitesRepository
	) {}

	async execute(criteria: string, isDomain: boolean) {
		const templateId = await this.websiteRepository.findTemplateIdByCriteria(criteria, isDomain)
		if (!templateId) {
			const mySQLData = await this.websiteRepository.findMySQLTemplateByCriteria(criteria, isDomain)
			if (mySQLData) return mySQLData
		}
		return await this.websiteRepository.getWebSite(templateId, criteria)
	}
}
