import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template6ProductsFeaturesValuesModel {
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

	@Prop({ required: true })
	bg_img: string
}

export const Template6ProductsFeaturesValuesSchema = SchemaFactory.createForClass(
	Template6ProductsFeaturesValuesModel
)
