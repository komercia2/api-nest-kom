import { Template6FooterSettings } from "./template6-footer-settings"

export class Template6Footer {
	bg_color: string
	"--background_color_1": string
	"--with_logo": string
	"--color_icon": string
	"--color_text": string
	watermark: boolean

	constructor(
		bg_color = Template6FooterSettings.bg_color,
		background_color_1 = Template6FooterSettings["--background_color_1"],
		with_logo = Template6FooterSettings["--with_logo"],
		color_icon = Template6FooterSettings["--color_icon"],
		color_text = Template6FooterSettings["--color_text"],
		watermark = Template6FooterSettings.watermark
	) {
		this.bg_color = bg_color
		this["--background_color_1"] = background_color_1
		this["--with_logo"] = with_logo
		this["--color_icon"] = color_icon
		this["--color_text"] = color_text
		this.watermark = watermark
	}
}
