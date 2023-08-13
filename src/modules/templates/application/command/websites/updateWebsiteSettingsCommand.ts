import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { WebSiteTemplate } from "@templates/domain/entities/websites/webSiteTemplate"
import { TemplateNotValidException } from "@templates/domain/exceptions"
import { IWebSitesRepository } from "@templates/domain/repositories"

@Injectable()
export class UpdateWebsiteSettingsCommand {
	constructor(
		@Inject(ApplicationInjectionTokens.IWebSiteRepository)
		private readonly websiteRepository: IWebSitesRepository
	) {}

	async execute(_id: string, templateNumber: number, settings: WebSiteTemplate) {
		const isValidRepository = await this.websiteRepository.findTemplateRepository(templateNumber)

		if (!isValidRepository) {
			throw new TemplateNotValidException(
				`You can't edit the settings of the template number ${templateNumber} because it doesn't exist or it's not valid. Please, check the template number and try again or use another service.`
			)
		}

		return await this.websiteRepository.updateSettings(_id, templateNumber, settings)
	}
}
