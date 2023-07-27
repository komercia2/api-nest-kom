import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15Footer {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true })
	visibleImg: boolean

	@Prop({ required: true })
	imgBg: string

	@Prop({ required: true })
	"--with_logo": string

	@Prop({ required: true })
	"--color_title": string

	@Prop({ required: true })
	"--color_text": string

	@Prop({ required: true })
	"--color_icon": string

	@Prop({ required: true })
	watermark: boolean
}

export const Template15FooterSchema = SchemaFactory.createForClass(Template15Footer)
