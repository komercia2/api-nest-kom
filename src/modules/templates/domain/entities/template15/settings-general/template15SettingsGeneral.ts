import { settingsGeneralSettings } from "./template15SettingsGeneral.settings"

export class Template15SettingsGeneral {
	font: string
	radius: string
	hover_text_btn: string
	hover_bg_btn: string
	hover_text: string

	constructor(
		font = settingsGeneralSettings.font,
		radius = settingsGeneralSettings.radius,
		hover_text_btn = settingsGeneralSettings.hover_text_btn,
		hover_bg_btn = settingsGeneralSettings.hover_bg_btn,
		hover_text = settingsGeneralSettings.hover_text
	) {
		this.font = font
		this.radius = radius
		this.hover_text_btn = hover_text_btn
		this.hover_bg_btn = hover_bg_btn
		this.hover_text = hover_text
	}
}
