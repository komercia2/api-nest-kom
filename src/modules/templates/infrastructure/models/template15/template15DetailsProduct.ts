import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15DetailsProducts {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true })
	"--background_color_2": string

	@Prop({ required: true })
	color_breadCrumbs: string

	@Prop({ required: true })
	color_border: string

	@Prop({ required: true })
	color_title: string

	@Prop({ required: true })
	color_price: string

	@Prop({ required: true })
	color_priceDescount: string

	@Prop({ required: true })
	color_text: string

	@Prop({ required: true })
	color_subText: string

	@Prop({ required: true })
	color_btn: string

	@Prop({ required: true })
	color_text_btn: string

	@Prop({ required: true })
	color_icon: string

	@Prop({ required: true })
	fontWeightTitle: number

	@Prop({ required: true })
	fontWeightPrice: number

	@Prop({ required: true })
	fontWeightPriceDescount: number

	@Prop({ required: true })
	fontSizeTitle: string

	@Prop({ required: true })
	fontSizePrice: string

	@Prop({ required: true })
	fontSizePriceDescount: string
}

export const Template15DetailsProductsSchema =
	SchemaFactory.createForClass(Template15DetailsProducts)
