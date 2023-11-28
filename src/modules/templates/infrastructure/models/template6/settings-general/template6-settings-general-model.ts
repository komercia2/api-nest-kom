import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template6SettingsGeneralModel {
	@Prop({ required: true })
	"font": string

	@Prop({ required: true })
	"--radius": string

	@Prop({ required: false })
	"--hover_bg_btn": string

	@Prop({ required: false })
	"--hover_text_btn": string

	@Prop({ required: false })
	"--hover_border_text": string

	@Prop({ required: false })
	"--hover_text": string
}

export const Template6SettingsGeneralSchema = SchemaFactory.createForClass(
	Template6SettingsGeneralModel
)
