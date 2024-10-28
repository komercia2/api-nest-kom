export interface ITemplate16Entity {
	_id: string
	header: Record<string, object>
	banner: Record<string, object>
	content: Record<string, object>
	information: Record<string, object>
	detailsProducts: Record<string, object>
	cardProducts: Record<string, object>
	pageHeader: Record<string, object>
	offers: Record<string, object>
	listProductsHome: Record<string, object>
	informationStore: Record<string, object>
	newsletter: Record<string, object>
	listBlogHome: Record<string, object>
	cardBlog: Record<string, object>
	logos: Record<string, object>
	footer: Record<string, object>
	listProductsFilter: Record<string, object>
	categories: Record<string, object>
	contact: Record<string, object>
	settingsGeneral: Record<string, object>
}

export class Template16Entity implements ITemplate16Entity {
	_id: string
	header: Record<string, object>
	banner: Record<string, object>
	content: Record<string, object>
	information: Record<string, object>
	detailsProducts: Record<string, object>
	cardProducts: Record<string, object>
	pageHeader: Record<string, object>
	offers: Record<string, object>
	listProductsHome: Record<string, object>
	informationStore: Record<string, object>
	newsletter: Record<string, object>
	listBlogHome: Record<string, object>
	cardBlog: Record<string, object>
	logos: Record<string, object>
	footer: Record<string, object>
	listProductsFilter: Record<string, object>
	categories: Record<string, object>
	contact: Record<string, object>
	settingsGeneral: Record<string, object>

	constructor(props: ITemplate16Entity) {
		this._id = props._id
		this.header = props.header
		this.banner = props.banner
		this.content = props.content
		this.information = props.information
		this.detailsProducts = props.detailsProducts
		this.cardProducts = props.cardProducts
		this.pageHeader = props.pageHeader
		this.offers = props.offers
		this.listProductsHome = props.listProductsHome
		this.informationStore = props.informationStore
		this.newsletter = props.newsletter
		this.listBlogHome = props.listBlogHome
		this.cardBlog = props.cardBlog
		this.logos = props.logos
		this.footer = props.footer
		this.listProductsFilter = props.listProductsFilter
		this.categories = props.categories
		this.contact = props.contact
		this.settingsGeneral = props.settingsGeneral
	}
}
