import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15InformationLogosValues {
	@Prop({ required: true })
	icono: string

	@Prop({ required: true })
	title: string

	@Prop({ required: true })
	text: string

	@Prop({ required: true })
	color_title: string

	@Prop({ required: true })
	color_text: string

	@Prop({ required: true })
	fontSizeTitle: string

	@Prop({ required: true })
	fontSizeText: string

	@Prop({ required: true })
	fontWeightTitle: number

	@Prop({ required: true })
	fontWeightText: number
}

export const Template15InformationLogosValuesSchema = SchemaFactory.createForClass(
	Template15InformationLogosValues
)
