import { listProductFilterSettings } from "./template15ListProductsFilter.settings"

export class Template15ListProductsFilter {
	"--background_color_1": string
	img: string
	color_breadCrumbs: string
	visible_img: boolean
	color_title: string
	"--color_categories": string
	"--color_subCategories": string
	"--color_icon": string
	"--color_border": string
	"--color_pagination": string

	constructor(
		background_color_1 = listProductFilterSettings["--background_color_1"],
		img = listProductFilterSettings.img,
		color_breadCrumbs = listProductFilterSettings.color_breadCrumbs,
		visible_img = listProductFilterSettings.visible_img,
		color_title = listProductFilterSettings.color_title,
		color_categories = listProductFilterSettings["--color_categories"],
		color_subCategories = listProductFilterSettings["--color_subCategories"],
		color_icon = listProductFilterSettings["--color_icon"],
		color_border = listProductFilterSettings["--color_border"],
		color_pagination = listProductFilterSettings["--color_pagination"]
	) {
		this["--background_color_1"] = background_color_1
		this.img = img
		this.color_breadCrumbs = color_breadCrumbs
		this.visible_img = visible_img
		this.color_title = color_title
		this["--color_categories"] = color_categories
		this["--color_subCategories"] = color_subCategories
		this["--color_icon"] = color_icon
		this["--color_border"] = color_border
		this["--color_pagination"] = color_pagination
	}
}
