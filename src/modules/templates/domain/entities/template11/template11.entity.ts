interface ITemplate11Entity {
	header: Record<string, object>
	pages: Record<string, object>
	banner: Record<string, object>
	section: Record<string, object>
	trending: Record<string, object>
	cardProduct: Record<string, object>
	parallax: Record<string, object>
	information: Record<string, object>
	blog: Record<string, object>
	newsletter: Record<string, object>
	footer: Record<string, object>
	contact: Record<string, object>
	productList: Record<string, object>
	detailsProduct: Record<string, object>
	settingGeneral: Record<string, object>
}

export class Template11Entity implements ITemplate11Entity {
	header: Record<string, object>
	pages: Record<string, object>
	banner: Record<string, object>
	section: Record<string, object>
	trending: Record<string, object>
	cardProduct: Record<string, object>
	parallax: Record<string, object>
	information: Record<string, object>
	blog: Record<string, object>
	newsletter: Record<string, object>
	footer: Record<string, object>
	contact: Record<string, object>
	productList: Record<string, object>
	detailsProduct: Record<string, object>
	settingGeneral: Record<string, object>

	constructor(data: ITemplate11Entity) {
		this.header = data.header
		this.pages = data.pages
		this.banner = data.banner
		this.section = data.section
		this.trending = data.trending
		this.cardProduct = data.cardProduct
		this.parallax = data.parallax
		this.information = data.information
		this.blog = data.blog
		this.newsletter = data.newsletter
		this.footer = data.footer
		this.contact = data.contact
		this.productList = data.productList
		this.detailsProduct = data.detailsProduct
		this.settingGeneral = data.settingGeneral
	}
}
