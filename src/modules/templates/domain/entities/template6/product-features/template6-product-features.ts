import { Template6ProductFeaturesSettings } from "./template6-product-features-settings"
import { Template6ProductFeaturesValues } from "./template6-product-features-values"

export class Template6ProductFeatures {
	"subTitle": string
	"title": string
	"description": string
	"color_subTitle": string
	"color_title": string
	"color_description": string
	values: Template6ProductFeaturesValues[]

	constructor(
		subTitle = Template6ProductFeaturesSettings.subTitle,
		title = Template6ProductFeaturesSettings.title,
		description = Template6ProductFeaturesSettings.description,
		color_subTitle = Template6ProductFeaturesSettings.color_subTitle,
		color_title = Template6ProductFeaturesSettings.color_title,
		color_description = Template6ProductFeaturesSettings.color_description,
		values = Template6ProductFeaturesSettings.values
	) {
		this.subTitle = subTitle
		this.title = title
		this.description = description
		this.color_subTitle = color_subTitle
		this.color_title = color_title
		this.color_description = color_description
		this.values = values
	}
}
