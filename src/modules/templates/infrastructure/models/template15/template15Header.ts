import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15Header {
	@Prop({ required: true, type: String })
	"--background_color_1": string

	@Prop({ required: true, type: String })
	"--color_text": string

	@Prop({ required: true, type: String })
	"--color_border": string

	@Prop({ required: true, type: String })
	"--color-icon": string

	@Prop({ required: true, type: String })
	"--padding_logo": string

	@Prop({ required: true, type: String })
	"--with_logo": string
}

export const Template15HeaderSchema = SchemaFactory.createForClass(Template15Header)
