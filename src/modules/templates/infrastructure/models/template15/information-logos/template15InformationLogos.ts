import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"

import { Template15InformationLogosValues } from "./template15InformationLogosValues"

@Schema({ _id: false })
export class Template15InformationLogos {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true })
	visible: string

	@Prop({ required: true })
	img: string

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
		type: Types.Array<Template15InformationLogosValues>,
		ref: Template15InformationLogosValues.name
	})
	values: Template15InformationLogosValues[]
}

export const Template15InformationLogosSchema = SchemaFactory.createForClass(
	Template15InformationLogos
)
