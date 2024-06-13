import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import {
	ITemplate6Repository,
	ITemplate7Repository,
	ITemplate15Repository,
	IWapiTemplateRepository
} from "@templates/domain/repositories"
import { TemplateRepository } from "@templates/domain/types"

@Injectable()
export class WebSiteMockService {
	private readonly allowedTemplatesRepositories = new Map<
		number,
		ITemplate6Repository | ITemplate15Repository | IWapiTemplateRepository | ITemplate7Repository
	>([
		[15, this.template15Repository],
		[6, this.template6Repository],
		[99, this.wapiTemplateRepository],
		[7, this.template7Repository]
	])

	constructor(
		@Inject(ApplicationInjectionTokens.ITemplate15Repository)
		private readonly template15Repository: ITemplate15Repository,

		@Inject(ApplicationInjectionTokens.ITemplate6Repository)
		private readonly template6Repository: ITemplate6Repository,

		@Inject(ApplicationInjectionTokens.IWapiTemplateRepository)
		private readonly wapiTemplateRepository: IWapiTemplateRepository,

		@Inject(ApplicationInjectionTokens.ITemplate7Repository)
		private readonly template7Repository: ITemplate7Repository
	) {}

	getWebSiteRepository = async (templateNumber: number): Promise<TemplateRepository | null> => {
		const repository = this.allowedTemplatesRepositories.get(templateNumber)
		return repository ?? null
	}
}
