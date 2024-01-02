import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"

import { Template6InformationValuesModel } from "./template6-information-model-values"

@Schema({ _id: false })
export class Template6InformationModel {
	@Prop({ required: true })
	order: number

	@Prop({ required: true })
	visible: boolean

	@Prop({ required: false })
	subtitle: string

	@Prop({ required: true })
	title: string

	@Prop({ required: true })
	description: string

	@Prop({ required: false })
	color_subTitle: string

	@Prop({ required: true })
	color_title: string

	@Prop({ required: true })
	color_description: string

	@Prop({ required: true })
	bg_color: string

	@Prop({
		required: true,
		type: Types.Array<Template6InformationValuesModel>,
		ref: Template6InformationValuesModel.name
	})
	values: Template6InformationValuesModel[]
}

export const Template6InformationSchema = SchemaFactory.createForClass(Template6InformationModel)
