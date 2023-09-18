import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { IWebSitesRepository } from "@templates/domain/repositories"

@Injectable()
export class DeleteWebsiteCommand {
	constructor(
		@Inject(ApplicationInjectionTokens.IWebSiteRepository)
		private readonly websiteRepostory: IWebSitesRepository
	) {}

	async execute(_id: string, templateId: string) {
		return await this.websiteRepostory.delete(_id, templateId)
	}
}
