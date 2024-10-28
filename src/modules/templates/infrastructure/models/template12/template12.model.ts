import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ObjectId } from "mongoose"

@Schema({ collection: "template12" })
export class Template12Model {
	_id: ObjectId

	@Prop({ required: false })
	desktopBanner: string

	@Prop({ required: false })
	responsiveBanner: string

	@Prop({ required: false })
	bannerFilterOpacity: number

	@Prop({ required: false })
	fontFamily: string

	@Prop({ required: false })
	roundedImages: boolean

	@Prop({ required: false })
	responsiveImages: boolean

	@Prop({ required: false })
	titleColor: string

	@Prop({ required: false })
	textColor: string

	@Prop({ required: false })
	priceColor: string

	@Prop({ required: false })
	logoSize: string

	@Prop({ required: false })
	backgroundColor: string

	@Prop({ required: false })
	footerText: string

	@Prop({ required: false })
	descriptionColor: string

	@Prop({ required: false })
	backgroundFooter: string

	@Prop({ required: false })
	bannerTitle: string

	@Prop({ required: false })
	bannerDescription: string

	@Prop({ required: false })
	bannerTitleColor: string

	@Prop({ required: false })
	bannerDescriptionColor: string

	@Prop({ required: false })
	footerTitle: string
}

export const Template12Schema = SchemaFactory.createForClass(Template12Model)
