import { template6BannerSettings } from "./template6-banner-settings"
import { Template6BannerValues } from "./template6-banner-values"

export class Template6Banner {
	order: number
	visible: boolean
	"subTitle": string
	"title": string
	"color_subTitle": string
	"color_title_main": string
	"color_description": string
	"color_title": string
	"img_main": string
	"img_second_1": string
	"img_second_2": string
	color_border: string
	bg_color: string
	values: Template6BannerValues[]

	constructor(
		order = template6BannerSettings.order,
		visible = template6BannerSettings.visible,
		subTitle = template6BannerSettings.subTitle,
		title = template6BannerSettings.title,
		color_subTitle = template6BannerSettings.color_subTitle,
		color_title_main = template6BannerSettings.color_title_main,
		color_description = template6BannerSettings.color_description,
		color_title = template6BannerSettings.color_title,
		img_main = template6BannerSettings.img_main,
		img_second_1 = template6BannerSettings.img_second_1,
		img_second_2 = template6BannerSettings.img_second_2,
		color_border = template6BannerSettings.color_border,
		bg_color = template6BannerSettings.bg_color,
		values = template6BannerSettings.values
	) {
		this.visible = visible
		this.order = order
		this.subTitle = subTitle
		this.title = title
		this.color_subTitle = color_subTitle
		this.color_title_main = color_title_main
		this.color_description = color_description
		this.color_title = color_title
		this.img_main = img_main
		this.img_second_1 = img_second_1
		this.img_second_2 = img_second_2
		this.color_border = color_border
		this.bg_color = bg_color
		this.values = values
	}
}
