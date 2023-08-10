import { listBlogHomeSettings } from "./template15ListBlogHome.settings"

export class Template15ListBlogHome {
	"--background_color_1": string
	visible: boolean
	title: string
	color_title_1: string
	fontWeightTitle: string

	constructor(
		background_color_1 = listBlogHomeSettings["--background_color_1"],
		visible = listBlogHomeSettings.visible,
		title = listBlogHomeSettings.title,
		color_title_1 = listBlogHomeSettings.color_title_1,
		fontWeightTitle = listBlogHomeSettings.fontWeightTitle
	) {
		this["--background_color_1"] = background_color_1
		this.visible = visible
		this.title = title
		this.color_title_1 = color_title_1
		this.fontWeightTitle = fontWeightTitle
	}
}
