import {
	InformationLogosSettings,
	InformationLogosValues
} from "./template15InformationLogos.settings"
import { Tempalte15InformationLogosValues } from "./template15InformationLogosValues"

export class Tempalte15InformationLogos {
	"--background_color_1": string
	visible: boolean
	img: string
	title: string
	color_title_1: string
	fontSizeTitle: string
	fontWeighTitle: number
	values: Tempalte15InformationLogosValues[]

	constructor(
		background_color_1 = InformationLogosSettings["--background_color_1"],
		visible = InformationLogosSettings.visible,
		img = InformationLogosSettings.img,
		title = InformationLogosSettings.title,
		color_title_1 = InformationLogosSettings.color_title_1,
		fontSizeTitle = InformationLogosSettings.fontSizeTitle,
		fontWeighTitle = InformationLogosSettings.fontWeighTitle,
		values = InformationLogosValues
	) {
		this["--background_color_1"] = background_color_1
		this.visible = visible
		this.img = img
		this.title = title
		this.color_title_1 = color_title_1
		this.fontSizeTitle = fontSizeTitle
		this.fontWeighTitle = fontWeighTitle
		this.values = values
	}
}
