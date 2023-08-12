import { listProductsOffersSettings } from "./template15ListProductsOffers.settings"

export class Template15ListProductsOffers {
	"--background_color_1": string
	visible: boolean
	title: string
	color_title_1: string
	fontWeighTitle: string

	constructor(
		background_color_1 = listProductsOffersSettings["--background_color_1"],
		visible = listProductsOffersSettings.visible,
		title = listProductsOffersSettings.title,
		color_title_1 = listProductsOffersSettings.color_title_1,
		fontWeighTitle = listProductsOffersSettings.fontWeighTitle
	) {
		this["--background_color_1"] = background_color_1
		this.visible = visible
		this.title = title
		this.color_title_1 = color_title_1
		this.fontWeighTitle = fontWeighTitle
	}
}
