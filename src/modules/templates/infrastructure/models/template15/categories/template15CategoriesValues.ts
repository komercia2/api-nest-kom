import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15CategoriesValues {
	@Prop({ required: true })
	img: string

	@Prop({ required: true })
	title: string

	@Prop({ required: true })
	color_title: string

	@Prop({ required: true })
	url_redirect: string

	@Prop({ required: true })
	fontWeighTitle: number
}

export const Template15CategoriesValuesSchema = SchemaFactory.createForClass(
	Template15CategoriesValues
)
