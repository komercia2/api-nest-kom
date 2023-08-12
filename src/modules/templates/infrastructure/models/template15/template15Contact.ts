import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15Contact {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true, type: Boolean })
	visible_img: boolean

	@Prop({ required: true })
	img: string

	@Prop({ required: true })
	color_breadCrumbs: string

	@Prop({ required: true })
	color_Bg: string

	@Prop({ required: true })
	color_title: string

	@Prop({ required: true })
	color_text: string

	@Prop({ required: true })
	color_icon: string

	@Prop({ required: true })
	color_title_form: string

	@Prop({ required: true })
	"--background_color_2": string

	@Prop({ required: true })
	color_input: string

	@Prop({ required: true })
	color_text_input: string

	@Prop({ required: true })
	color_btn_form: string

	@Prop({ required: true })
	color_text_btn_form: string
}

export const Template15ContactSchema = SchemaFactory.createForClass(Template15Contact)
