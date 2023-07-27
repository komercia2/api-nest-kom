import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15CardBlog {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true })
	color_title: string

	@Prop({ required: true })
	color_text: string

	@Prop({ required: true })
	fontWeightTitle: number

	@Prop({ required: true })
	fontWeightText: number

	@Prop({ required: true })
	color_icon: string

	@Prop({ required: true })
	color_btn: string

	@Prop({ required: true })
	color_border: string

	@Prop({ required: true })
	color_date: string

	@Prop({ required: true })
	color_bg_date: string
}

export const Template15CardBlogSchema = SchemaFactory.createForClass(Template15CardBlog)
