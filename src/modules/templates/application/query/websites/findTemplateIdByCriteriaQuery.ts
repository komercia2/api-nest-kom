import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { IWebSitesRepository } from "@templates/domain/repositories"

@Injectable()
export class FindTemplateIdByCriteriaQuery {
	constructor(
		@Inject(ApplicationInjectionTokens.IWebSiteRepository)
		private readonly websiteRepository: IWebSitesRepository
	) {}

	async execute(criteria: string, isDomain: boolean) {
		const templateId = await this.websiteRepository.findTemplateIdByCriteria(criteria, isDomain)

		if (!templateId) throw new Error("Template not found")

		return templateId
	}
}
