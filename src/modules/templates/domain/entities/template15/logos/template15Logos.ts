import { logosSettings, logosValues } from "./template15Logos.settings"
import { Template15LogosValues } from "./template15LogosValues"

export class Template15Logos {
	"--background_color_1": string
	visible: boolean
	title: string
	color_title_1: string
	color_title_2: string
	fontSizeTitle: string
	fontWeightTitle: number
	values: Template15LogosValues[]

	constructor(
		background_color_1 = logosSettings["--background_color_1"],
		visible = logosSettings.visible,
		title = logosSettings.title,
		color_title_1 = logosSettings.color_title_1,
		color_title_2 = logosSettings.color_title_2,
		fontSizeTitle = logosSettings.fontSizeTitle,
		fontWeightTitle = logosSettings.fontWeightTitle,
		values = logosValues
	) {
		this["--background_color_1"] = background_color_1
		this.visible = visible
		this.title = title
		this.color_title_1 = color_title_1
		this.color_title_2 = color_title_2
		this.fontSizeTitle = fontSizeTitle
		this.fontWeightTitle = fontWeightTitle
		this.values = values
	}
}
