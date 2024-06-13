interface ITemplate14Entity {
	_id: string
	header: Record<string, object>
	banner: Record<string, object>
	information: Record<string, object>
	detailsProducts: Record<string, object>
	pages: Record<string, object>
	cardProducts: Record<string, object>
	offers: Record<string, object>
	listProductsHome: Record<string, object>
	offersProduct: Record<string, object>
	newsletter: Record<string, object>
	listBlogHome: Record<string, object>
	cardBlog: Record<string, object>
	logos: Record<string, object>
	footer: Record<string, object>
	listProductsFilter: Record<string, object>
	contact: Record<string, object>
	settingsGeneral: Record<string, object>
}

export class Template14Entity implements ITemplate14Entity {
	_id: string
	header: Record<string, object>
	banner: Record<string, object>
	information: Record<string, object>
	detailsProducts: Record<string, object>
	pages: Record<string, object>
	cardProducts: Record<string, object>
	offers: Record<string, object>
	listProductsHome: Record<string, object>
	offersProduct: Record<string, object>
	newsletter: Record<string, object>
	listBlogHome: Record<string, object>
	cardBlog: Record<string, object>
	logos: Record<string, object>
	footer: Record<string, object>
	listProductsFilter: Record<string, object>
	contact: Record<string, object>
	settingsGeneral: Record<string, object>

	constructor(props: ITemplate14Entity) {
		this._id = props._id
		this.header = props.header
		this.banner = props.banner
		this.information = props.information
		this.detailsProducts = props.detailsProducts
		this.pages = props.pages
		this.cardProducts = props.cardProducts
		this.offers = props.offers
		this.listProductsHome = props.listProductsHome
		this.offersProduct = props.offersProduct
		this.newsletter = props.newsletter
		this.listBlogHome = props.listBlogHome
		this.cardBlog = props.cardBlog
		this.logos = props.logos
		this.footer = props.footer
		this.listProductsFilter = props.listProductsFilter
		this.contact = props.contact
		this.settingsGeneral = props.settingsGeneral
	}
}
