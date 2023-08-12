import { logosSettings, logosValues } from "./template15Logos.settings"
import { Template15LogosValues } from "./template15LogosValues"

export class Template15Logos {
	"--background_color_1": string
	visible: boolean
	title: string
	color_title_1: string
	fontWeightTitle: number
	values: Template15LogosValues[]

	constructor(
		background_color_1 = logosSettings["--background_color_1"],
		visible = logosSettings.visible,
		title = logosSettings.title,
		color_title_1 = logosSettings.color_title_1,
		fontWeightTitle = logosSettings.fontWeightTitle,
		values = logosValues
	) {
		this["--background_color_1"] = background_color_1
		this.visible = visible
		this.title = title
		this.color_title_1 = color_title_1
		this.fontWeightTitle = fontWeightTitle
		this.values = values
	}
}
