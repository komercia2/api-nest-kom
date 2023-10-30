import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { Template5Entity } from "@templates/domain/entities/template5"
import { ITemplateRepository } from "@templates/domain/repositories"

import { GetStoreTemplateSettingsDTO } from "./dtos"

@Injectable()
export class GetStoreTemplateQuery {
	constructor(
		@Inject(ApplicationInjectionTokens.ITemplateRepository)
		private readonly storeTemplateSettingsRepository: ITemplateRepository
	) {}

	async execute(input: GetStoreTemplateSettingsDTO) {
		const { template, storeId } = input
		const settings = await this.storeTemplateSettingsRepository.getTemplateSettings(
			template,
			storeId
		)

		if (!settings) return null

		const parsedTemplate = Number(template)

		if (parsedTemplate === 5) return this.template5ToDTO(settings)
	}

	private template5ToDTO = (template: Template5Entity) => ({
		banner: template.banner,
		banner_footer: template.bannerFooter,
		iframe: template.iframe,
		settings: {
			"--background_color_1": template.backgroundColor_1,
			"--background_color_2": template.backgroundColor_2,
			"--color_background_btn": template.colorBackgroundBtn,
			"--color_border": template.colorBorder,
			"--color_icon": template.colorIcon,
			"--color_subtext": template.colorSubtext,
			"--color_text": template.colorText,
			"--color_text_btn": template.colorTextBtn,
			tipo_letra: template.tipoLetra
		}
	})
}
