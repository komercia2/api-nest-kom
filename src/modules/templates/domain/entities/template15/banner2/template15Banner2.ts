import { banner2Settings } from "./template15Banner2.settings"

export class Template15Banner2 {
	"--background_color_1": string
	imgBg: string
	visible: boolean
	title: string
	text: string
	color_title: string
	color_text: string
	fontWeighTitle: number
	fontWeighText: number
	text_btn_1: string
	color_text_btn_1: string
	color_bg_btn_1: string
	url_redirect_1: string
	visible_btn_1: boolean
	text_btn_2: string
	color_text_btn_2: string
	color_bg_btn_2: string
	url_redirect_2: string
	visible_btn_2: boolean
	imgBg_res: string

	constructor(
		background_color_1 = banner2Settings["--background_color_1"],
		imgBg = banner2Settings.imgBg,
		visible = banner2Settings.visible,
		title = banner2Settings.title,
		text = banner2Settings.text,
		color_title = banner2Settings.color_title,
		color_text = banner2Settings.color_text,
		fontWeighTitle = banner2Settings.fontWeighTitle,
		fontWeighText = banner2Settings.fontWeighText,
		text_btn_1 = banner2Settings.text_btn_1,
		color_text_btn_1 = banner2Settings.color_text_btn_1,
		color_bg_btn_1 = banner2Settings.color_bg_btn_1,
		url_redirect_1 = banner2Settings.url_redirect_1,
		visible_btn_1 = banner2Settings.visible_btn_1,
		text_btn_2 = banner2Settings.text_btn_2,
		color_text_btn_2 = banner2Settings.color_text_btn_2,
		color_bg_btn_2 = banner2Settings.color_bg_btn_2,
		url_redirect_2 = banner2Settings.url_redirect_2,
		imgBg_res = banner2Settings.imgBg_res
	) {
		this["--background_color_1"] = background_color_1
		this.imgBg = imgBg
		this.visible = visible
		this.title = title
		this.text = text
		this.color_title = color_title
		this.color_text = color_text
		this.fontWeighTitle = fontWeighTitle
		this.fontWeighText = fontWeighText
		this.text_btn_1 = text_btn_1
		this.color_text_btn_1 = color_text_btn_1
		this.color_bg_btn_1 = color_bg_btn_1
		this.url_redirect_1 = url_redirect_1
		this.visible_btn_1 = visible_btn_1
		this.text_btn_2 = text_btn_2
		this.color_text_btn_2 = color_text_btn_2
		this.color_bg_btn_2 = color_bg_btn_2
		this.url_redirect_2 = url_redirect_2
		this.imgBg_res = imgBg_res
	}
}
