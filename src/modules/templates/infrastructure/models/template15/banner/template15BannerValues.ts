import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class BannerValues {
	@Prop({ required: true })
	img: string

	@Prop({ required: true })
	img_res: string

	@Prop({ required: true })
	title: string

	@Prop({ required: true })
	subTitle: string

	@Prop({ required: true })
	text: string

	@Prop({ required: true })
	textBtn: string

	@Prop({ required: true })
	color_title: string

	@Prop({ required: true })
	color_subTitle: string

	@Prop({ required: true })
	color_text: string

	@Prop({ required: true })
	fontWeighTitle: number

	@Prop({ required: true })
	fontWeighSubTitle: number

	@Prop({ required: true })
	fontWeighText: number

	@Prop({ required: true })
	color_text_btn: string

	@Prop({ required: true })
	color_bg_btn: string

	@Prop({ required: true })
	url_redirect: string

	@Prop({ required: true, type: Boolean })
	visible_btn: boolean
}

export const BannerValuesSchema = SchemaFactory.createForClass(BannerValues)
