import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template6ProductOverviewsModel {
	@Prop({ required: true })
	order: number

	@Prop({ required: true })
	visible: boolean

	@Prop({ required: true })
	bg_color: string

	@Prop({ required: false })
	slug: string

	@Prop({ required: true })
	"--background_color_1": string

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
	fontWeighTitle: number

	@Prop({ required: true })
	fontWeighPrice: number

	@Prop({ required: true })
	fontWeighPriceDescount: number
}

export const Template6ProductOverviewsSchema = SchemaFactory.createForClass(
	Template6ProductOverviewsModel
)
