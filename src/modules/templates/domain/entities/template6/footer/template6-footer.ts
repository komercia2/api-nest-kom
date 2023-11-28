import { Template6FooterSettings } from "./template6-footer-settings"

export class Template6Footer {
	background_color_1: string
	with_logo: string
	color_icon: string
	color_title: string
	color_text: string
	watermark: boolean

	constructor(
		background_color_1 = Template6FooterSettings["--background_color_1"],
		with_logo = Template6FooterSettings["--with_logo"],
		color_icon = Template6FooterSettings["--color_icon"],
		color_title = Template6FooterSettings["--color_title"],
		color_text = Template6FooterSettings["--color_text"],
		watermark = Template6FooterSettings.watermark
	) {
		this.background_color_1 = background_color_1
		this.with_logo = with_logo
		this.color_icon = color_icon
		this.color_title = color_title
		this.color_text = color_text
		this.watermark = watermark
	}
}
