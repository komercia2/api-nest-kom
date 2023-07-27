import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15ContentValues {
	@Prop({ required: true, type: String })
	img: string

	@Prop({ required: true, type: String })
	title: string

	@Prop({ required: true, type: String })
	subTitle: string

	@Prop({ required: true, type: String })
	color_title: string

	@Prop({ required: true, type: String })
	color_text: string

	@Prop({ required: true, type: Number })
	fontWeighTitle: number

	@Prop({ required: true, type: Number })
	fontWeighText: number

	@Prop({ required: true, type: String })
	text_btn: string

	@Prop({ required: true, type: String })
	color_text_btn: string

	@Prop({ required: true, type: String })
	color_bg_btn: string

	@Prop({ required: true, type: String })
	url_redirect: string

	@Prop({ required: true, type: String })
	visible_btn: string
}

export const Template15ContentValuesSchema = SchemaFactory.createForClass(Template15ContentValues)
