import { Template6InformationSettings } from "./template6-information-settings"
import { Template6InformationValues } from "./template6-information-values"

export class Template6Information {
	"title": string
	"description": string
	"color_title": string
	"color_description": string
	values: Template6InformationValues[]

	constructor(
		title = Template6InformationSettings.title,
		description = Template6InformationSettings.description,
		color_title = Template6InformationSettings.color_title,
		color_description = Template6InformationSettings.color_description,
		values = Template6InformationSettings.values
	) {
		this.title = title
		this.description = description
		this.color_title = color_title
		this.color_description = color_description
		this.values = values
	}
}
