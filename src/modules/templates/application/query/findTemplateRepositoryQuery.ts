import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { IWebSitesRepository } from "@templates/domain/repositories"

@Injectable()
export class FindTemplateRepositoryQuery {
	@Inject(ApplicationInjectionTokens.IWebSiteRepository)
	private readonly websiteRepository: IWebSitesRepository

	async execute(templateNumber: number) {
		return await this.websiteRepository.findTemplateRepository(templateNumber)
	}
}
