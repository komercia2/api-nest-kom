import { information2Settings } from "./template15Information2.settings"

export class Template15Information2 {
	"--background_color_1": string
	visible: boolean
	imgBg: string
	imgLeft: string
	icon: string
	title: string
	text: string
	color_title: string
	color_price: string
	fontWeighTitle: number
	fontWeighPrice: number
	text_btn: string
	color_text_btn: string
	color_bg_btn: string
	url_redirect: string

	constructor(
		background_color_1 = information2Settings["--background_color_1"],
		visible = information2Settings.visible,
		imgBg = information2Settings.imgBg,
		imgLeft = information2Settings.imgLeft,
		icon = information2Settings.icon,
		title = information2Settings.title,
		text = information2Settings.text,
		color_title = information2Settings.color_title,
		color_price = information2Settings.color_price,
		fontWeighTitle = information2Settings.fontWeighTitle,
		fontWeighPrice = information2Settings.fontWeighPrice,
		text_btn = information2Settings.text_btn,
		color_text_btn = information2Settings.color_text_btn,
		color_bg_btn = information2Settings.color_bg_btn,
		url_redirect = information2Settings.url_redirect
	) {
		this["--background_color_1"] = background_color_1
		this.visible = visible
		this.imgBg = imgBg
		this.imgLeft = imgLeft
		this.icon = icon
		this.title = title
		this.text = text
		this.color_title = color_title
		this.color_price = color_price
		this.fontWeighTitle = fontWeighTitle
		this.fontWeighPrice = fontWeighPrice
		this.text_btn = text_btn
		this.color_text_btn = color_text_btn
		this.color_bg_btn = color_bg_btn
		this.url_redirect = url_redirect
	}
}
