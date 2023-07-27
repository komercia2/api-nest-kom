import { footerSettings } from "./template15Footer.settings"

export class Template15Footer {
	"--background_color_1": string
	visibleImg: boolean
	imgBg: string
	"--with_logo": string
	"--color_title": string
	"--color_text": string
	"--color_icon": string
	watermark: boolean

	constructor(
		background_color_1 = footerSettings["--background_color_1"],
		visibleImg = footerSettings.visibleImg,
		imgBg = footerSettings.imgBg,
		with_logo = footerSettings["--with_logo"],
		color_title = footerSettings["--color_title"],
		color_text = footerSettings["--color_text"],
		color_icon = footerSettings["--color_icon"],
		watermark = footerSettings.watermark
	) {
		this["--background_color_1"] = background_color_1
		this.visibleImg = visibleImg
		this.imgBg = imgBg
		this["--with_logo"] = with_logo
		this["--color_title"] = color_title
		this["--color_text"] = color_text
		this["--color_icon"] = color_icon
		this.watermark = watermark
	}
}
