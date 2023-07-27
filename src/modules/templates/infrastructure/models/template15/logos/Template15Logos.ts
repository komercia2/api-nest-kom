import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

import { Template15LogosValues } from "./template15LogosValues"

@Schema({ _id: false })
export class Template15Logos {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true })
	visible: boolean

	@Prop({ required: true })
	title: string

	@Prop({ required: true })
	color_title_1: string

	@Prop({ required: true })
	color_title_2: string

	@Prop({ required: true })
	fontSizeTitle: string

	@Prop({ required: true })
	fontWeightTitle: number

	@Prop({
		required: true,
		type: [Template15LogosValues],
		ref: Template15LogosValues.name
	})
	values: Template15LogosValues[]
}

export const Template15LogosSchema = SchemaFactory.createForClass(Template15Logos)
