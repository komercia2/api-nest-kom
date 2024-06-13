interface ITemplate10Entity {
	header: Record<string, object>
	banner: Record<string, object>
	section: Record<string, object>
	pages: Record<string, object>
	trending: Record<string, object>
	cardProduct: Record<string, object>
	offers: Record<string, object>
	productList: Record<string, object>
	productListFilter: Record<string, object>
	blog: Record<string, object>
	footer: Record<string, object>
	contact: Record<string, object>
	detailsProduct: Record<string, object>
	settingGeneral: Record<string, object>
}

export class Template10Entity implements ITemplate10Entity {
	header: Record<string, object>
	banner: Record<string, object>
	section: Record<string, object>
	pages: Record<string, object>
	trending: Record<string, object>
	cardProduct: Record<string, object>
	offers: Record<string, object>
	productList: Record<string, object>
	productListFilter: Record<string, object>
	blog: Record<string, object>
	footer: Record<string, object>
	contact: Record<string, object>
	detailsProduct: Record<string, object>
	settingGeneral: Record<string, object>

	constructor(data: ITemplate10Entity) {
		this.header = data.header
		this.banner = data.banner
		this.section = data.section
		this.pages = data.pages
		this.trending = data.trending
		this.cardProduct = data.cardProduct
		this.offers = data.offers
		this.productList = data.productList
		this.productListFilter = data.productListFilter
		this.blog = data.blog
		this.footer = data.footer
		this.contact = data.contact
		this.detailsProduct = data.detailsProduct
		this.settingGeneral = data.settingGeneral
	}
}
