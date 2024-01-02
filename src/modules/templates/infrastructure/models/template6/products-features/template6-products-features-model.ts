import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"

import { Template6ProductsFeaturesValuesModel } from "./template6-products-feature-values-model"

@Schema({ _id: false })
export class Template6ProductsFeatureModel {
	@Prop({ required: true })
	order: number

	@Prop({ required: true })
	visible: boolean

	@Prop({ required: true })
	subTitle: string

	@Prop({ required: true })
	title: string

	@Prop({ required: true })
	description: string

	@Prop({ required: true })
	color_subTitle: string

	@Prop({ required: true })
	color_title: string

	@Prop({ required: true })
	color_description: string

	@Prop({ required: true })
	bg_color: string

	@Prop({
		required: true,
		type: Types.Array<Template6ProductsFeaturesValuesModel>,
		ref: Template6ProductsFeaturesValuesModel.name
	})
	values: Template6ProductsFeaturesValuesModel[]
}

export const Template6ProductsFeatureSchema = SchemaFactory.createForClass(
	Template6ProductsFeatureModel
)
