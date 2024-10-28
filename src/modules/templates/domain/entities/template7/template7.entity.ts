interface ITemplate7Entity {
	_id: string
	header: Record<string, object>
	banner: Record<string, object>
	content: Record<string, object>
	productList: Record<string, object>
	card: Record<string, object>
	advertising: Record<string, object>
	ProductFavorite: Record<string, object>
	howWork: Record<string, object>
	blog: Record<string, object>
	newsletter: Record<string, object>
	contentImg: Record<string, object>
	footer: Record<string, object>
	productListFilter: Record<string, object>
	contact: Record<string, object>
	detailsProduct: Record<string, object>
	card1: Record<string, object>
	blog1: Record<string, object>
	settingGeneral: Record<string, object>
}

export class Template7Entity implements ITemplate7Entity {
	_id: string
	header: Record<string, object>
	banner: Record<string, object>
	content: Record<string, object>
	productList: Record<string, object>
	card: Record<string, object>
	advertising: Record<string, object>
	ProductFavorite: Record<string, object>
	howWork: Record<string, object>
	blog: Record<string, object>
	newsletter: Record<string, object>
	contentImg: Record<string, object>
	footer: Record<string, object>
	productListFilter: Record<string, object>
	contact: Record<string, object>
	detailsProduct: Record<string, object>
	card1: Record<string, object>
	blog1: Record<string, object>
	settingGeneral: Record<string, object>

	constructor(data: ITemplate7Entity) {
		this._id = data._id
		this.header = data.header
		this.banner = data.banner
		this.content = data.content
		this.productList = data.productList
		this.card = data.card
		this.advertising = data.advertising
		this.ProductFavorite = data.ProductFavorite
		this.howWork = data.howWork
		this.blog = data.blog
		this.newsletter = data.newsletter
		this.contentImg = data.contentImg
		this.footer = data.footer
		this.productListFilter = data.productListFilter
		this.contact = data.contact
		this.detailsProduct = data.detailsProduct
		this.card1 = data.card1
		this.blog1 = data.blog1
		this.settingGeneral = data.settingGeneral
	}
}
