import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template6FooterModel {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true })
	"--with_logo": string

	@Prop({ required: true })
	"--color_icon": string

	@Prop({ required: true })
	"--color_title": string

	@Prop({ required: true })
	"--color_text": string

	@Prop({ required: true })
	watermark: boolean
}

export const Template6FooterSchema = SchemaFactory.createForClass(Template6FooterModel)
