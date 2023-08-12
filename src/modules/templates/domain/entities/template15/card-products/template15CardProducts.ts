import { cardProductSettings } from "./template15CardProducts.settings"

export class Template15CardProducts {
	"--background_color_1": string
	"--color_title": string
	"--color_price": string
	"--fontWeighTitle": number
	"--fontWeighPrice": number
	color_icon: string
	color_btn: string
	"--color_border": string

	constructor(
		background_color_1 = cardProductSettings["--background_color_1"],
		color_title = cardProductSettings["--color_title"],
		color_price = cardProductSettings["--color_price"],
		fontWeighTitle = cardProductSettings["--fontWeighTitle"],
		fontWeighPrice = cardProductSettings["--fontWeighPrice"],
		color_icon = cardProductSettings.color_icon,
		color_btn = cardProductSettings.color_btn,
		color_border = cardProductSettings["--color_border"]
	) {
		this["--background_color_1"] = background_color_1
		this["--color_title"] = color_title
		this["--color_price"] = color_price
		this["--fontWeighTitle"] = fontWeighTitle
		this["--fontWeighPrice"] = fontWeighPrice
		this.color_icon = color_icon
		this.color_btn = color_btn
		this["--color_border"] = color_border
	}
}
