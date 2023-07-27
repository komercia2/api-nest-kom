import { informationSettings } from "./template15Information.settings"

export class Template15Information {
	"--background_color_1": string
	"--background_color_2": string
	img: string
	icon: string
	text: string
	color_text: string
	fontWeighText: number
	text_btn: string
	color_text_btn: string
	color_bg_btn: string
	url_redirect: string
	visible_btn: string

	constructor(
		background_color_1 = informationSettings["--background_color_1"],
		background_color_2 = informationSettings["--background_color_2"],
		img = informationSettings.img,
		icon = informationSettings.icon,
		text = informationSettings.text,
		color_text = informationSettings.color_text,
		fontWeighText = informationSettings.fontWeighText,
		text_btn = informationSettings.text_btn,
		color_text_btn = informationSettings.color_text_btn,
		color_bg_btn = informationSettings.color_bg_btn,
		url_redirect = informationSettings.url_redirect,
		visible_btn = informationSettings.visible_btn
	) {
		this["--background_color_1"] = background_color_1
		this["--background_color_2"] = background_color_2
		this.img = img
		this.icon = icon
		this.text = text
		this.color_text = color_text
		this.fontWeighText = fontWeighText
		this.text_btn = text_btn
		this.color_text_btn = color_text_btn
		this.color_bg_btn = color_bg_btn
		this.url_redirect = url_redirect
		this.visible_btn = visible_btn
	}
}
