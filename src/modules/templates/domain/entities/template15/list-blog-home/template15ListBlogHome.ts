import { listBlogHomeSettings } from "./template15ListBlogHome.settings"

export class Template15ListBlogHome {
	"--background_color_1": string
	visible: boolean
	title: string
	color_title_1: string
	color_title_2: string
	fontWeightTitle: string
	fontSizeTitle: string

	constructor(
		background_color_1 = listBlogHomeSettings["--background_color_1"],
		visible = listBlogHomeSettings.visible,
		title = listBlogHomeSettings.title,
		color_title_1 = listBlogHomeSettings.color_title_1,
		color_title_2 = listBlogHomeSettings.color_title_2,
		fontWeightTitle = listBlogHomeSettings.fontWeightTitle,
		fontSizeTitle = listBlogHomeSettings.fontSizeTitle
	) {
		this["--background_color_1"] = background_color_1
		this.visible = visible
		this.title = title
		this.color_title_1 = color_title_1
		this.color_title_2 = color_title_2
		this.fontSizeTitle = fontSizeTitle
		this.fontWeightTitle = fontWeightTitle
	}
}
