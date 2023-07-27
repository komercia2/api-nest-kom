import { contentSettings, contentValues } from "./template15Content.settings"
import { Template15ContentValues } from "./template15ContentValues"

export class Template15Content {
	"--background_color_1": string
	visible: string
	values: Template15ContentValues[]

	constructor(
		background_color_1 = contentSettings["--background_color_1"],
		visible = contentSettings.visible,
		values = contentValues
	) {
		this["--background_color_1"] = background_color_1
		this.visible = visible
		this.values = values
	}
}
