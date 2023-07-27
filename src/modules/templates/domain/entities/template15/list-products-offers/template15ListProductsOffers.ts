import { listProductsOffersSettings } from "./template15ListProductsOffers.settings"

export class Template15ListProductsOffers {
	"--background_color_1": string
	visible: string
	title: string
	color_title_1: string
	color_title_2: string
	fontSizeTitle: string
	fontWeighTitle: string

	constructor(
		background_color_1 = listProductsOffersSettings["--background_color_1"],
		visible = listProductsOffersSettings.visible,
		title = listProductsOffersSettings.title,
		color_title_1 = listProductsOffersSettings.color_title_1,
		color_title_2 = listProductsOffersSettings.color_title_2,
		fontSizeTitle = listProductsOffersSettings.fontSizeTitle,
		fontWeighTitle = listProductsOffersSettings.fontWeighTitle
	) {
		this["--background_color_1"] = background_color_1
		this.visible = visible
		this.title = title
		this.color_title_1 = color_title_1
		this.color_title_2 = color_title_2
		this.fontSizeTitle = fontSizeTitle
		this.fontWeighTitle = fontWeighTitle
	}
}
