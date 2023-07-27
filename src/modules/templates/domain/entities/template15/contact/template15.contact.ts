import { contactSettings } from "./template15Contact.settings"

export class Template15Contact {
	"--background_color_1": string
	visible_img: boolean
	img: string
	color_breadCrumbs: string
	color_Bg: string
	color_title: string
	color_text: string
	color_icon: string
	color_title_form: string
	"--background_color_2": string
	color_input: string
	color_text_input: string
	color_btn_form: string
	color_text_btn_form: string

	constructor(
		background_color_1 = contactSettings["--background_color_1"],
		visible_img = contactSettings.visible_img,
		img = contactSettings.img,
		color_breadCrumbs = contactSettings.color_breadCrumbs,
		color_Bg = contactSettings.color_Bg,
		color_title = contactSettings.color_title,
		color_text = contactSettings.color_text,
		color_icon = contactSettings.color_icon,
		color_title_form = contactSettings.color_title_form,
		background_color_2 = contactSettings["--background_color_2"],
		color_input = contactSettings.color_input,
		color_text_input = contactSettings.color_text_input,
		color_btn_form = contactSettings.color_btn_form,
		color_text_btn_form = contactSettings.color_text_btn_form
	) {
		this["--background_color_1"] = background_color_1
		this.visible_img = visible_img
		this.img = img
		this.color_breadCrumbs = color_breadCrumbs
		this.color_Bg = color_Bg
		this.color_title = color_title
		this.color_text = color_text
		this.color_icon = color_icon
		this.color_title_form = color_title_form
		this["--background_color_2"] = background_color_2
		this.color_input = color_input
		this.color_text_input = color_text_input
		this.color_btn_form = color_btn_form
		this.color_text_btn_form = color_text_btn_form
	}
}
