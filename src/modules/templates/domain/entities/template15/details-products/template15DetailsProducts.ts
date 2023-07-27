import { detailsProductsSettings } from "./template15DetailsProducts.settings"

export class Template15DetailsProducts {
	"--background_color_1": string
	"--background_color_2": string
	color_breadCrumbs: string
	color_border: string
	color_title: string
	color_price: string
	color_priceDescount: string
	color_text: string
	color_subText: string
	color_btn: string
	color_text_btn: string
	color_icon: string
	fontWeightTitle: number
	fontWeightPrice: number
	fontWeightPriceDescount: number
	fontSizeTitle: string
	fontSizePrice: string
	fontSizePriceDescount: string

	constructor(
		background_color_1 = detailsProductsSettings["--background_color_1"],
		background_color_2 = detailsProductsSettings["--background_color_2"],
		color_breadCrumbs = detailsProductsSettings.color_breadCrumbs,
		color_border = detailsProductsSettings.color_border,
		color_title = detailsProductsSettings.color_title,
		color_price = detailsProductsSettings.color_price,
		color_priceDescount = detailsProductsSettings.color_priceDescount,
		color_text = detailsProductsSettings.color_text,
		color_subText = detailsProductsSettings.color_subText,
		color_btn = detailsProductsSettings.color_btn,
		color_text_btn = detailsProductsSettings.color_text_btn,
		color_icon = detailsProductsSettings.color_icon,
		fontWeightTitle = detailsProductsSettings.fontWeightTitle,
		fontWeightPrice = detailsProductsSettings.fontWeightPrice,
		fontWeightPriceDescount = detailsProductsSettings.fontWeightPriceDescount,
		fontSizeTitle = detailsProductsSettings.fontSizeTitle,
		fontSizePrice = detailsProductsSettings.fontSizePrice,
		fontSizePriceDescount = detailsProductsSettings.fontSizePriceDescount
	) {
		this["--background_color_1"] = background_color_1
		this["--background_color_2"] = background_color_2
		this.color_breadCrumbs = color_breadCrumbs
		this.color_border = color_border
		this.color_title = color_title
		this.color_price = color_price
		this.color_priceDescount = color_priceDescount
		this.color_text = color_text
		this.color_subText = color_subText
		this.color_btn = color_btn
		this.color_text_btn = color_text_btn
		this.color_icon = color_icon
		this.fontWeightTitle = fontWeightTitle
		this.fontWeightPrice = fontWeightPrice
		this.fontWeightPriceDescount = fontWeightPriceDescount
		this.fontSizeTitle = fontSizeTitle
		this.fontSizePrice = fontSizePrice
		this.fontSizePriceDescount = fontSizePriceDescount
	}
}
