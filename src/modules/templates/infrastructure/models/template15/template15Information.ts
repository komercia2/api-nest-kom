import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15Information {
	@Prop({ required: true, type: String })
	"--background_color_1": string

	@Prop({ required: true, type: String })
	"--background_color_2": string

	@Prop({ required: true, type: Boolean })
	visible: boolean

	@Prop({ required: true, type: String })
	img: string

	@Prop({ required: true, type: String })
	icon: string

	@Prop({ required: true, type: String })
	text: string

	@Prop({ required: true, type: String })
	color_text: string

	@Prop({ required: true, type: String })
	fontWeighText: number

	@Prop({ required: true, type: String })
	text_btn: string

	@Prop({ required: true, type: String })
	color_text_btn: string

	@Prop({ required: true, type: String })
	color_bg_btn: string

	@Prop({ required: true, type: String })
	url_redirect: string

	@Prop({ required: true, type: Boolean })
	visible_btn: boolean
}

export const Template15InformationSchema = SchemaFactory.createForClass(Template15Information)
