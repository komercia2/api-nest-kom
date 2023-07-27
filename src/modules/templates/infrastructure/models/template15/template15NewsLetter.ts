import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Template15NewsLetter {
	@Prop({ required: true })
	title: string

	@Prop({ required: true })
	subTitle: string

	@Prop({ required: true })
	color_title: string

	@Prop({ required: true })
	color_text: string

	@Prop({ required: true })
	color_border: string

	@Prop({ required: true })
	color_input: string

	@Prop({ required: true })
	color_text_input: string

	@Prop({ required: true })
	colorBg_Btn: string

	@Prop({ required: true })
	color_icon: string
}

export const Template15NewsLetterSchema = SchemaFactory.createForClass(Template15NewsLetter)
