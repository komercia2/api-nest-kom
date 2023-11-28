import { template6SettingsGeneralSettings } from "./template6-settings-general-settings"

export class Template6SettingsGeneral {
	"font": string
	"--radius": string
	"--hover_bg_btn": string
	"--hover_text_btn": string
	"--hover_border_text": string
	"--hover_text": string

	constructor(
		font = template6SettingsGeneralSettings.font,
		radius = template6SettingsGeneralSettings["--radius"],
		hover_bg_btn = template6SettingsGeneralSettings["--hover_bg_btn"],
		hover_text_btn = template6SettingsGeneralSettings["--hover_text_btn"],
		hover_border_text = template6SettingsGeneralSettings["--hover_border_text"],
		hover_text = template6SettingsGeneralSettings["--hover_text"]
	) {
		this.font = font
		this["--radius"] = radius
		this["--hover_bg_btn"] = hover_bg_btn
		this["--hover_text_btn"] = hover_text_btn
		this["--hover_border_text"] = hover_border_text
		this["--hover_text"] = hover_text
	}
}
