import { cardBlogsSettings } from "./template15CardBlog.settings"

export class Template15CardBlogs {
	"--background_color_1": string
	color_title: string
	color_text: string
	fontWeightTitle: number
	fontWeightText: number
	color_icon: string
	color_btn: string
	color_border: string
	color_date: string
	color_bg_date: string

	constructor(
		background_color_1 = cardBlogsSettings["--background_color_1"],
		color_title = cardBlogsSettings.color_title,
		color_text = cardBlogsSettings.color_text,
		fontWeightTitle = cardBlogsSettings.fontWeightTitle,
		fontWeightText = cardBlogsSettings.fontWeightText,
		color_icon = cardBlogsSettings.color_icon,
		color_btn = cardBlogsSettings.color_btn,
		color_border = cardBlogsSettings.color_border,
		color_date = cardBlogsSettings.color_date,
		color_bg_date = cardBlogsSettings.color_bg_date
	) {
		this["--background_color_1"] = background_color_1
		this.color_title = color_title
		this.color_text = color_text
		this.fontWeightTitle = fontWeightTitle
		this.fontWeightText = fontWeightText
		this.color_icon = color_icon
		this.color_btn = color_btn
		this.color_border = color_border
		this.color_date = color_date
		this.color_bg_date = color_bg_date
	}
}
