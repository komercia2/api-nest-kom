import { listProductHomeSettings } from "./template15ListProductHome.settings"

export class Template15ListProductHome {
	"--background_color_1": string
	visible: string
	title: string
	color_title_1: string
	color_title_2: string
	fontSizeTitle: string
	fontWeighTitle: number

	constructor(
		background_color_1 = listProductHomeSettings["--background_color_1"],
		visible = listProductHomeSettings.visible,
		title = listProductHomeSettings.title,
		color_title_1 = listProductHomeSettings.color_title_1,
		color_title_2 = listProductHomeSettings.color_title_2,
		fontSizeTitle = listProductHomeSettings.fontSizeTitle,
		fontWeighTitle = listProductHomeSettings.fontWeighTitle
	) {
		this["--background_color_1"] = background_color_1
		this.visible = visible
		this.title = title
		this.color_title_1 = color_title_1
		this.color_title_2 = color_title_2
		this.fontSizeTitle = fontSizeTitle
		this.fontWeighTitle = fontWeighTitle
	}
}
