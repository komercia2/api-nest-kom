import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15GeneralSettings {
	@Prop({ required: true })
	font: string

	@Prop({ required: true })
	radius: string

	@Prop({ required: true })
	hover_text_btn: string

	@Prop({ required: true })
	hover_bg_btn: string

	@Prop({ required: true })
	hover_text: string
}

export const Template15GeneralSettingsSchema =
	SchemaFactory.createForClass(Template15GeneralSettings)
