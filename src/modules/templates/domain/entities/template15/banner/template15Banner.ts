import { bannerSettings, bannerValues } from "./template15Banner.settings"
import { Template15BannerValues } from "./template15BannerValues"

export class Template15Banner {
	"--background_color_1": string
	"--color_pagination": string
	visible: string
	values: Template15BannerValues[]

	constructor(
		background_color_1 = bannerSettings["--background_color_1"],
		color_pagination = bannerSettings["--color_pagination"],
		visible = bannerSettings.visible,
		values = bannerValues
	) {
		this["--background_color_1"] = background_color_1
		this["--color_pagination"] = color_pagination
		this.visible = visible
		this.values = values
	}

	toPrimitive = () => {
		return {
			"--background_color_1": this["--background_color_1"],
			"--color_pagination": this["--color_pagination"],
			visible: this.visible,
			values: this.values.map((value) => ({ ...value }))
		}
	}
}
