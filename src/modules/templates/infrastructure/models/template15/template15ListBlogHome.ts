import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15ListBlogHome {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true })
	visible: boolean

	@Prop({ required: true })
	title: string

	@Prop({ required: true })
	color_title_1: string

	@Prop({ required: true })
	color_title_2: string

	@Prop({ required: true })
	fontWeightTitle: number

	@Prop({ required: true })
	fontSizeTitle: string
}

export const Template15ListBlogHomeSchema = SchemaFactory.createForClass(Template15ListBlogHome)
