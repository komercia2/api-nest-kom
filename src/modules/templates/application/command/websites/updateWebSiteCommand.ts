import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { IWebSitesRepository } from "@templates/domain/repositories"

import { UpdateWebSiteDto } from "../dtos"

@Injectable()
export class UpdateWebSiteCommand {
	constructor(
		@Inject(ApplicationInjectionTokens.IWebSiteRepository)
		private readonly websiteRepository: IWebSitesRepository
	) {}

	async execute(updateWebsiteDto: UpdateWebSiteDto) {
		const { _id } = updateWebsiteDto
		return await this.websiteRepository.updateWebsiteInfo(_id, updateWebsiteDto)
	}
}
