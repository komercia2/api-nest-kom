import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15Information2 {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true })
	visible: boolean

	@Prop({ required: true })
	imgBg: string

	@Prop({ required: true })
	imgLeft: string

	@Prop({ required: true })
	icon: string

	@Prop({ required: true })
	title: string

	@Prop({ required: true })
	text: string

	@Prop({ required: true })
	color_title: string

	@Prop({ required: true })
	color_price: string

	@Prop({ required: true })
	fontWeighTitle: number

	@Prop({ required: true })
	fontWeighPrice: number

	@Prop({ required: true })
	text_btn: string

	@Prop({ required: true })
	color_text_btn: string

	@Prop({ required: true })
	color_bg_btn: string

	@Prop({ required: true })
	url_redirect: string
}

export const Template15Information2Schema = SchemaFactory.createForClass(Template15Information2)
