import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template6HeaderModel {
	@Prop({ required: true })
	bg_color: string

	@Prop({ required: true })
	"--color_text": string

	@Prop({ required: true })
	"--color_icon": string

	@Prop({ required: true })
	"--color_border": string

	@Prop({ required: true })
	"--padding_logo": string

	@Prop({ required: true })
	"--with_logo": string
}

export const Template6HeaderSchema = SchemaFactory.createForClass(Template6HeaderModel)
