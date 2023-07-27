import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

import { Template15CategoriesValues } from "./template15CategoriesValues"

@Schema({ _id: false })
export class Template15Categories {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true })
	visible: string

	@Prop({ required: true })
	title: string

	@Prop({ required: true })
	color_title_1: string

	@Prop({ required: true })
	color_title_2: string

	@Prop({ required: true })
	fontSizeTitle: string

	@Prop({ required: true })
	fontWeighTitle: number

	@Prop({
		required: true,
		type: [Template15CategoriesValues],
		ref: Template15CategoriesValues.name
	})
	values: Template15CategoriesValues[]
}

export const Template15CategoriesSchema = SchemaFactory.createForClass(Template15Categories)
