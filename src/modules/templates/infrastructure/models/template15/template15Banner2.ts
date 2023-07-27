import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15Banner2 {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true })
	imgBg: string

	@Prop({ required: true })
	visible: boolean

	@Prop({ required: true })
	title: string

	@Prop({ required: true })
	text: string

	@Prop({ required: true })
	color_title: string

	@Prop({ required: true })
	color_text: string

	@Prop({ required: true })
	fontSizeTitle: string

	@Prop({ required: true })
	fontSizeText: string

	@Prop({ required: true })
	fontWeighTitle: number

	@Prop({ required: true })
	fontWeighText: number

	@Prop({ required: true })
	text_btn_1: string

	@Prop({ required: true })
	color_text_btn_1: string

	@Prop({ required: true })
	color_bg_btn_1: string

	@Prop({ required: true })
	url_redirect_1: string

	@Prop({ required: true })
	visible_btn_1: boolean

	@Prop({ required: true })
	text_btn_2: string

	@Prop({ required: true })
	color_text_btn_2: string

	@Prop({ required: true })
	color_bg_btn_2: string

	@Prop({ required: true })
	url_redirect_2: string

	@Prop({ required: true })
	visible_btn_2: boolean
}

export const Template15Banner2Schema = SchemaFactory.createForClass(Template15Banner2)
