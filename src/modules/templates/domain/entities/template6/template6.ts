import { Template6Banner } from "./banner"
import { Template6Footer } from "./footer"
import { Template6Header } from "./header"
import { Template6Information } from "./information"
import { Template6InformationLogos } from "./information-logos"
import { Template6ProductFeatures } from "./product-features"
import { Template6ProductOverviews } from "./product-overviews"
import { Template6SettingsGeneral } from "./settings-general"

export class Template6Entity {
	header: Template6Header
	settingsGeneral: Template6SettingsGeneral
	banner: Template6Banner
	productFeatures: Template6ProductFeatures
	productOverviews: Template6ProductOverviews
	information: Template6Information
	informationLogos: Template6InformationLogos
	footer: Template6Footer

	constructor() {
		this.header = new Template6Header()
		this.settingsGeneral = new Template6SettingsGeneral()
		this.banner = new Template6Banner()
		this.productFeatures = new Template6ProductFeatures()
		this.productOverviews = new Template6ProductOverviews()
		this.information = new Template6Information()
		this.informationLogos = new Template6InformationLogos()
		this.footer = new Template6Footer()
	}
}
