import { headerSettings } from "./template15Header.settings"

export class Template15Header {
	"--background_color_1": string
	"--color_text": string
	"--color_border": string
	"color-icon": string
	"--padding_logo": string
	"--with_logo": string

	constructor(
		background_color_1 = headerSettings["--background_color_1"],
		color_text = headerSettings["--color_text"],
		color_border = headerSettings["--color_border"],
		color_icon = headerSettings["--color-icon"],
		padding_logo = headerSettings["--padding_logo"],
		with_logo = headerSettings["--with_logo"]
	) {
		this["--background_color_1"] = background_color_1
		this["--color_text"] = color_text
		this["--color_border"] = color_border
		this["color-icon"] = color_icon
		this["--padding_logo"] = padding_logo
		this["--with_logo"] = with_logo
	}
}
