import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { IWebSitesRepository } from "@templates/domain/repositories"

import { CreateWebSiteDto } from "../dtos"

@Injectable()
export class UpdateWebSiteCommand {
	constructor(
		@Inject(ApplicationInjectionTokens.IWebSiteRepository)
		private readonly websiteRepository: IWebSitesRepository
	) {}

	async execute(updateWebsiteDto: CreateWebSiteDto) {
		return await this.websiteRepository.updateWebsiteInfo(updateWebsiteDto._id, updateWebsiteDto)
	}
}
