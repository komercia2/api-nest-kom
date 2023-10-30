import { Inject, Injectable } from "@nestjs/common"
import { ApplicationInjectionTokens } from "@templates/application/application-injection.tokens"
import { Template5Entity } from "@templates/domain/entities/template5"
import { Template99Entity } from "@templates/domain/entities/template99"
import { ITemplateRepository } from "@templates/domain/repositories"

import { GetStoreTemplateSettingsDTO } from "./dtos"

@Injectable()
export class GetStoreTemplateQuery {
	constructor(
		@Inject(ApplicationInjectionTokens.ITemplateRepository)
		private readonly templatesRepository: ITemplateRepository
	) {}

	async execute(input: GetStoreTemplateSettingsDTO) {
		const { template, storeId } = input
		const settings = await this.templatesRepository.getTemplateSettings(template, storeId)

		if (!settings) return null

		const parsedTemplate = Number(template)

		if (parsedTemplate === 5 && settings instanceof Template5Entity) {
			return this.template5ToDTO(settings)
		}

		if (parsedTemplate === 99 && settings instanceof Template99Entity) {
			return this.template99ToDTO(settings)
		}
	}

	private template99ToDTO = (template: Template99Entity) => ({
		id: template.id,
		banner: template.banner,
		tiendas_id: template.tiendasId,
		created_at: template.createdAt,
		updated_at: template.updatedAt,
		descripcion: template.descripcion,
		logo_cuadrado: template.logoCuadrado,
		color_primario: template.colorPrimario,
		color_secundario: template.colorSecundario,
		color_icon: template.colorIcon,
		tema: template.tema,
		pago_online: template.pagoOnline,
		mensaje_principal: template.mensajePrincipal,
		estilo_productos: template.estiloProductos,
		estilo_categorias: template.estiloCategorias,
		watermark: template.watermark,
		state_subcategorias: template.stateSubcategorias
	})

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
