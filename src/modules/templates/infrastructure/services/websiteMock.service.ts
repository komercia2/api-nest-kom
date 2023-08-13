import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { ITemplate15Repository } from "@templates/domain/repositories"
import { TemplateRepository } from "@templates/domain/types"

@Injectable()
export class WebSiteMockService {
	private readonly allowedTemplatesRepositories = new Map([[15, this.template15Repository]])

	constructor(
		@Inject(ApplicationInjectionTokens.ITemplate15Repository)
		private readonly template15Repository: ITemplate15Repository
	) {}

	getWebSiteRepository = async (templateNumber: number): Promise<TemplateRepository | null> => {
		const repository = this.allowedTemplatesRepositories.get(templateNumber)
		return repository ?? null
	}
}
