import { categoriesSettings, categoriesValues } from "./template15Categories.settings"
import { Template15CategoriesValues } from "./template15CategoriesValues"

export class Template15Categories {
	"--background_color_1": string
	visible: string
	title: string
	color_title_1: string
	color_title_2: string
	fontSizeTitle: string
	fontWeighTitle: number
	values: Template15CategoriesValues[]

	constructor(
		background_color_1 = categoriesSettings["--background_color_1"],
		visible = categoriesSettings.visible,
		title = categoriesSettings.title,
		color_title_1 = categoriesSettings.color_title_1,
		color_title_2 = categoriesSettings.color_title_2,
		fontSizeTitle = categoriesSettings.fontSizeTitle,
		fontWeighTitle = categoriesSettings.fontWeighTitle,
		values = categoriesValues
	) {
		this["--background_color_1"] = background_color_1
		this.visible = visible
		this.title = title
		this.color_title_1 = color_title_1
		this.color_title_2 = color_title_2
		this.fontSizeTitle = fontSizeTitle
		this.fontWeighTitle = fontWeighTitle
		this.values = values
	}

	toPrimitive = () => {
		return {
			"--background_color_1": this["--background_color_1"],
			visible: this.visible,
			title: this.title,
			color_title_1: this.color_title_1,
			color_title_2: this.color_title_2,
			fontSizeTitle: this.fontSizeTitle,
			fontWeighTitle: this.fontWeighTitle,
			values: this.values.map((value) => ({ ...value }))
		}
	}
}
