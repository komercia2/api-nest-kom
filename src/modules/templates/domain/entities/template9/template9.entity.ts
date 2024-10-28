interface ITemplate9Entity {
	_id: string
	header: Record<string, object>
	footer: Record<string, object>
	banner: Record<string, object>
	koffers: Record<string, object>
	productList: Record<string, object>
	cardProduct: Record<string, object>
	blog: Record<string, object>
	wrapper: Record<string, object>
	newsletter: Record<string, object>
	productListFilter: Record<string, object>
	contact: Record<string, object>
	detailsProduct: Record<string, object>
	settingGeneral: Record<string, object>
}

export class Template9Entity implements ITemplate9Entity {
	_id: string
	header: Record<string, object>
	footer: Record<string, object>
	banner: Record<string, object>
	koffers: Record<string, object>
	productList: Record<string, object>
	cardProduct: Record<string, object>
	blog: Record<string, object>
	wrapper: Record<string, object>
	newsletter: Record<string, object>
	productListFilter: Record<string, object>
	contact: Record<string, object>
	detailsProduct: Record<string, object>
	settingGeneral: Record<string, object>

	constructor(data: ITemplate9Entity) {
		this._id = data._id
		this.header = data.header
		this.footer = data.footer
		this.banner = data.banner
		this.koffers = data.koffers
		this.productList = data.productList
		this.cardProduct = data.cardProduct
		this.blog = data.blog
		this.wrapper = data.wrapper
		this.newsletter = data.newsletter
		this.productListFilter = data.productListFilter
		this.contact = data.contact
		this.detailsProduct = data.detailsProduct
		this.settingGeneral = data.settingGeneral
	}
}
