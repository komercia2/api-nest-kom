import { newsLetterSettings } from "./template15NewsLetter.settings"

export class Template15NewsLetter {
	title: string
	subTitle: string
	color_title: string
	color_text: string
	color_border: string
	color_input: string
	color_text_input: string
	colorBg_Btn: string
	color_icon: string

	constructor(
		title = newsLetterSettings.title,
		subTitle = newsLetterSettings.subTitle,
		color_title = newsLetterSettings.color_title,
		color_text = newsLetterSettings.color_text,
		color_border = newsLetterSettings.color_border,
		color_input = newsLetterSettings.color_input,
		color_text_input = newsLetterSettings.color_text_input,
		colorBg_Btn = newsLetterSettings.colorBg_Btn,
		color_icon = newsLetterSettings.color_icon
	) {
		this.title = title
		this.subTitle = subTitle
		this.color_title = color_title
		this.color_text = color_text
		this.color_border = color_border
		this.color_input = color_input
		this.color_text_input = color_text_input
		this.colorBg_Btn = colorBg_Btn
		this.color_icon = color_icon
	}
}
