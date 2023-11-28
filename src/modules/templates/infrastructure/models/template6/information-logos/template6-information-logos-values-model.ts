import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template6InformationLogosValuesModel {
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
	fontWeighTitle: number

	@Prop({ required: true })
	fontWeighText: number
}

export const Template6InformationLogosValuesSchema = SchemaFactory.createForClass(
	Template6InformationLogosValuesModel
)
