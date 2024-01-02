import { Template6InformationLogosSettings } from "./template6-information-logos-settings"
import { Template6InformationLogosValues } from "./template6-infotmation-logos-values"

export class Template6InformationLogos {
	order: number
	"--background_color_1": string
	"visible": boolean
	"title": string
	"color_title_1": string
	"fontWeighTitle": number
	values: Template6InformationLogosValues[]

	constructor(
		order = Template6InformationLogosSettings.order,
		background_color_1 = Template6InformationLogosSettings["--background_color_1"],
		visible = Template6InformationLogosSettings.visible,
		title = Template6InformationLogosSettings.title,
		color_title_1 = Template6InformationLogosSettings.color_title_1,
		fontWeighTitle = Template6InformationLogosSettings.fontWeighTitle,
		values = Template6InformationLogosSettings.values
	) {
		this.order = order
		this["--background_color_1"] = background_color_1
		this.visible = visible
		this.title = title
		this.color_title_1 = color_title_1
		this.fontWeighTitle = fontWeighTitle
		this.values = values
	}
}
