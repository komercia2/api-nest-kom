import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template6InformationValuesModel {
	@Prop({ required: true })
	img: string

	@Prop({ required: true })
	title: string

	@Prop({ required: true })
	description: string

	@Prop({ required: true })
	color_title: string

	@Prop({ required: true })
	color_description: string
}

export const Template6InformationValuesSchema = SchemaFactory.createForClass(
	Template6InformationValuesModel
)
