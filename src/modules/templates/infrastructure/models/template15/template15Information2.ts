import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15Information2 {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true, type: Boolean })
	visible: boolean

	@Prop({ required: true, type: String })
	imgBg: string

	@Prop({ required: true, type: String })
	imgLeft: string

	@Prop({ required: true, type: String })
	icon: string

	@Prop({ required: true, type: String })
	title: string

	@Prop({ required: true, type: String })
	text: string

	@Prop({ required: true, type: String })
	color_title: string

	@Prop({ required: true, type: String })
	color_price: string

	@Prop({ required: true, type: String })
	fontWeighTitle: number

	@Prop({ required: true, type: String })
	fontWeighPrice: number

	@Prop({ required: true, type: String })
	text_btn: string

	@Prop({ required: true, type: String })
	color_text_btn: string

	@Prop({ required: true, type: String })
	color_bg_btn: string

	@Prop({ required: true, type: String })
	url_redirect: string
}

export const Template15Information2Schema = SchemaFactory.createForClass(Template15Information2)
