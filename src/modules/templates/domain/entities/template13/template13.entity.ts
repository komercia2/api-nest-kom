interface ITemplate13Entity {
	_id: string
	header: Record<string, object>
	pages: Record<string, object>
	banner: Record<string, object>
	cardProduct: Record<string, object>
	information: Record<string, object>
	newsletter: Record<string, object>
	footer: Record<string, object>
	contact: Record<string, object>
	productList: Record<string, object>
	productListFilter: Record<string, object>
	settingGeneral: Record<string, object>
	detailsProduct: Record<string, object>
	infoText: Record<string, object>
}

export class Template13Entity implements ITemplate13Entity {
	_id: string
	header: Record<string, object>
	pages: Record<string, object>
	banner: Record<string, object>
	cardProduct: Record<string, object>
	information: Record<string, object>
	newsletter: Record<string, object>
	footer: Record<string, object>
	contact: Record<string, object>
	productList: Record<string, object>
	productListFilter: Record<string, object>
	settingGeneral: Record<string, object>
	detailsProduct: Record<string, object>
	infoText: Record<string, object>

	constructor(data: ITemplate13Entity) {
		this._id = data._id
		this.header = data.header
		this.pages = data.pages
		this.banner = data.banner
		this.cardProduct = data.cardProduct
		this.information = data.information
		this.newsletter = data.newsletter
		this.footer = data.footer
		this.contact = data.contact
		this.productList = data.productList
		this.productListFilter = data.productListFilter
		this.settingGeneral = data.settingGeneral
		this.detailsProduct = data.detailsProduct
		this.infoText = data.infoText
	}
}
