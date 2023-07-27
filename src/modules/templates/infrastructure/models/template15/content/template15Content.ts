import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"

import { Template15ContentValues } from "./template15ContentValues"

@Schema({ _id: false })
export class Template15Content {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true })
	visible: string

	@Prop({
		required: true,
		type: Types.Array<Template15ContentValues>,
		ref: Template15ContentValues.name
	})
	values: Template15ContentValues[]
}

export const Template15ContentSchema = SchemaFactory.createForClass(Template15Content)
