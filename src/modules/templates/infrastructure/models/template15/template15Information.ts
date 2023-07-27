import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15Information {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true })
	"--background_color_2": string

	@Prop({ required: true })
	img: string

	@Prop({ required: true })
	icon: string

	@Prop({ required: true })
	text: string

	@Prop({ required: true })
	color_text: string

	@Prop({ required: true })
	fontWeighText: number

	@Prop({ required: true })
	text_btn: string

	@Prop({ required: true })
	color_text_btn: string

	@Prop({ required: true })
	color_bg_btn: string

	@Prop({ required: true })
	url_redirect: string

	@Prop({ required: true })
	visible_btn: string
}

export const Template15InformationSchema = SchemaFactory.createForClass(Template15Information)
