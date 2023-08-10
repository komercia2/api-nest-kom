import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15ListBlogHome {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true, type: Boolean })
	visible: boolean

	@Prop({ required: true })
	title: string

	@Prop({ required: true })
	color_title_1: string
}

export const Template15ListBlogHomeSchema = SchemaFactory.createForClass(Template15ListBlogHome)
