import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Template15Banner2 } from "@templates/domain/entities/template15/banner2"
import { Template15CardProducts } from "@templates/domain/entities/template15/card-products"
import { Template15Categories } from "@templates/domain/entities/template15/categories"
import { Template15Information } from "@templates/domain/entities/template15/information"
import { Template15Information2 } from "@templates/domain/entities/template15/information2"
import { Template15ListProductHome } from "@templates/domain/entities/template15/list-products-home"
import { Template15Logos } from "@templates/domain/entities/template15/logos/template15Logos"
import { Template15NewsLetter } from "@templates/domain/entities/template15/news-letter"
import { Transform } from "class-transformer"
import { ObjectId, Types } from "mongoose"

import { Template15Banner } from "./banner"
import { Template15Content } from "./content/template15Content"
import { Template15InformationLogos } from "./information-logos/template15InformationLogos"
import { Template15CardBlog } from "./template15CardBlog"
import { Template15Contact } from "./template15Contact"
import { Template15DetailsProducts } from "./template15DetailsProduct"
import { Template15Footer } from "./template15Footer"
import { Template15GeneralSettings } from "./template15GeneralSettings"
import { Template15Header } from "./template15Header"
import { Template15ListBlogHome } from "./template15ListBlogHome"
import { Template15ListProductFilter } from "./template15ListProductFilter"
import { Template15ListProductsOffers } from "./template15ListProductOffers"
import { Template15PageHeader } from "./template15PageHeader"

@Schema({ collection: "template15" })
export class Template15Model {
	_id: ObjectId

	@Prop({ required: true, type: Template15Header, ref: Template15Header.name })
	header: Template15Header

	@Prop({ required: true, type: Types.Array<Template15PageHeader>, ref: Template15PageHeader.name })
	pageHeader: Template15PageHeader[]

	@Prop({ required: true, type: Template15Categories, ref: Template15Banner.name })
	banner: Template15Banner

	@Prop({ required: true, type: Template15Categories, ref: Template15Categories.name })
	categories: Template15Categories

	@Prop({ required: true, type: Template15Content, ref: Template15Content.name })
	content: Template15Content

	@Prop({ required: true, type: Template15ListProductHome, ref: Template15ListProductHome.name })
	listProductsHome: Template15ListProductHome

	@Prop({
		required: true,
		type: Template15ListProductsOffers,
		ref: Template15ListProductsOffers.name
	})
	listProductsOffers: Template15ListProductsOffers

	@Prop({ required: true, type: Template15CardProducts, ref: Template15CardProducts.name })
	cardProducts: Template15CardProducts

	@Prop({ required: true, type: Template15Information, ref: Template15Information.name })
	information: Template15Information

	@Prop({ required: true, type: Template15InformationLogos, ref: Template15InformationLogos.name })
	informationLogos: Template15InformationLogos

	@Prop({ required: true, type: Template15Information2, ref: Template15Information2.name })
	information2: Template15Information2

	@Prop({ required: true, type: Template15Banner2, ref: Template15Banner2.name })
	banner2: Template15Banner2

	@Prop({ required: true, type: Template15Logos, ref: Template15Banner2.name })
	logos: Template15Logos

	@Prop({ required: true, type: Template15ListBlogHome, ref: Template15ListBlogHome.name })
	listBlogHome: Template15ListBlogHome

	@Prop({ required: true, type: Template15CardBlog, ref: Template15CardBlog.name })
	cardBlogs: Template15CardBlog

	@Prop({
		required: true,
		type: Template15ListProductFilter,
		ref: Template15ListProductFilter.name
	})
	listProductsFilter: Template15ListProductFilter

	@Prop({ required: true, type: Template15DetailsProducts, ref: Template15DetailsProducts.name })
	detailsProducts: Template15DetailsProducts

	@Prop({ required: true, type: Template15Contact, ref: Template15Contact.name })
	contact: Template15Contact

	@Prop({ required: true, type: Template15Footer, ref: Template15Footer.name })
	footer: Template15Footer

	@Prop({ required: true, type: Template15NewsLetter, ref: Template15NewsLetter.name })
	newsLetter: Template15NewsLetter

	@Prop({ required: true, type: Template15GeneralSettings, ref: Template15GeneralSettings.name })
	settingGeneral: Template15GeneralSettings
}

export const Template15Schema = SchemaFactory.createForClass(Template15Model)
