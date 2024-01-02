import { template6HeaderSettings } from "./template6-header-settings"

export class Template6Header {
	"bg_color": string
	"--color_text": string
	"--color_icon": string
	"--color_border": string
	"--padding_logo": string
	"--with_logo": string

	constructor(
		bg_color = template6HeaderSettings.bg_color,
		color_text = template6HeaderSettings["--color_text"],
		color_icon = template6HeaderSettings["--color_icon"],
		color_border = template6HeaderSettings["--color_border"],
		padding_logo = template6HeaderSettings["--padding_logo"],
		with_logo = template6HeaderSettings["--with_logo"]
	) {
		this.bg_color = bg_color
		this["--color_text"] = color_text
		this["--color_icon"] = color_icon
		this["--color_border"] = color_border
		this["--padding_logo"] = padding_logo
		this["--with_logo"] = with_logo
	}
}
