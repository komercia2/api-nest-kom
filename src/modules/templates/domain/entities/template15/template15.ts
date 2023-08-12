import { Template15Banner } from "./banner"
import { Template15Banner2 } from "./banner2"
import { Template15CardBlogs } from "./card-blog"
import { Template15CardProducts } from "./card-products"
import { Template15Categories } from "./categories"
import { Template15Contact } from "./contact"
import { Template15Content } from "./content"
import { Template15DetailsProducts } from "./details-products"
import { Template15Footer } from "./footer"
import { Template15Header } from "./header"
import { Template15Information } from "./information"
import { Template15Information2 } from "./information2"
import { Tempalte15InformationLogos } from "./informationLogos"
import { Template15ListBlogHome } from "./list-blog-home"
import { Template15ListProductsFilter } from "./list-products-filter"
import { Template15ListProductHome } from "./list-products-home"
import { Template15ListProductsOffers } from "./list-products-offers"
import { Template15Logos } from "./logos/template15Logos"
import { Template15NewsLetter } from "./news-letter"
import { Template15PageHeader } from "./page-header"
import { Template15SettingsGeneral } from "./settings-general"

export class Template15 {
	_id: string
	header: Template15Header
	pageHeader: Template15PageHeader
	banner: Template15Banner
	categories: Template15Categories
	content: Template15Content
	listProductsHome: Template15ListProductHome
	listProductsOffers: Template15ListProductsOffers
	cardProducts: Template15CardProducts
	information: Template15Information
	informationLogos: Tempalte15InformationLogos
	information2: Template15Information2
	banner2: Template15Banner2
	logos: Template15Logos
	listBlogHome: Template15ListBlogHome
	cardBlogs: Template15CardBlogs
	listProductsFilter: Template15ListProductsFilter
	detailsProducts: Template15DetailsProducts
	contact: Template15Contact
	footer: Template15Footer
	newsLetter: Template15NewsLetter
	settingGeneral: Template15SettingsGeneral

	constructor() {
		this._id = this._id
		this.header = new Template15Header()
		this.pageHeader = new Template15PageHeader()
		this.banner = new Template15Banner()
		this.categories = new Template15Categories()
		this.content = new Template15Content()
		this.listProductsHome = new Template15ListProductHome()
		this.listProductsOffers = new Template15ListProductsOffers()
		this.cardProducts = new Template15CardProducts()
		this.information = new Template15Information()
		this.informationLogos = new Tempalte15InformationLogos()
		this.information2 = new Template15Information2()
		this.banner2 = new Template15Banner2()
		this.logos = new Template15Logos()
		this.listBlogHome = new Template15ListBlogHome()
		this.cardBlogs = new Template15CardBlogs()
		this.listProductsFilter = new Template15ListProductsFilter()
		this.detailsProducts = new Template15DetailsProducts()
		this.contact = new Template15Contact()
		this.footer = new Template15Footer()
		this.newsLetter = new Template15NewsLetter()
		this.settingGeneral = new Template15SettingsGeneral()
	}
}
