import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"

import { Template6InformationLogosValuesModel } from "./template6-information-logos-values-model"

@Schema({ _id: false })
export class Template6InformationLogosModel {
	@Prop({ required: true })
	order: number

	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true })
	visible: boolean

	@Prop({ required: true })
	title: string

	@Prop({ required: true })
	color_title_1: string

	@Prop({ required: true })
	fontWeighTitle: number

	@Prop({
		required: true,
		type: Types.Array<Template6InformationLogosValuesModel>,
		ref: Template6InformationLogosValuesModel.name
	})
	values: Template6InformationLogosValuesModel[]
}

export const Template6InformationLogosSchema = SchemaFactory.createForClass(
	Template6InformationLogosModel
)
