import { Template6ProductOverviewsSettings } from "./template6-product-overviews-settings"

export class Template6ProductOverviews {
	slug: string
	"--background_color_1": string
	color_border: string
	color_title: string
	color_price: string
	color_priceDescount: string
	color_text: string
	color_subText: string
	color_btn: string
	color_text_btn: string
	color_icon: string
	fontWeighTitle: number
	fontWeighPrice: number
	fontWeighPriceDescount: number

	constructor(
		slug = Template6ProductOverviewsSettings.slug,
		background_color_1 = Template6ProductOverviewsSettings["--background_color_1"],
		color_border = Template6ProductOverviewsSettings.color_border,
		color_title = Template6ProductOverviewsSettings.color_title,
		color_price = Template6ProductOverviewsSettings.color_price,
		color_priceDescount = Template6ProductOverviewsSettings.color_priceDescount,
		color_text = Template6ProductOverviewsSettings.color_text,
		color_subText = Template6ProductOverviewsSettings.color_subText,
		color_btn = Template6ProductOverviewsSettings.color_btn,
		color_text_btn = Template6ProductOverviewsSettings.color_text_btn,
		color_icon = Template6ProductOverviewsSettings.color_icon,
		fontWeighTitle = Template6ProductOverviewsSettings.fontWeighTitle,
		fontWeighPrice = Template6ProductOverviewsSettings.fontWeighPrice,
		fontWeighPriceDescount = Template6ProductOverviewsSettings.fontWeighPriceDescount
	) {
		this.slug = slug
		this["--background_color_1"] = background_color_1
		this.color_border = color_border
		this.color_title = color_title
		this.color_price = color_price
		this.color_priceDescount = color_priceDescount
		this.color_text = color_text
		this.color_subText = color_subText
		this.color_btn = color_btn
		this.color_text_btn = color_text_btn
		this.color_icon = color_icon
		this.fontWeighTitle = fontWeighTitle
		this.fontWeighPrice = fontWeighPrice
		this.fontWeighPriceDescount = fontWeighPriceDescount
	}
}
