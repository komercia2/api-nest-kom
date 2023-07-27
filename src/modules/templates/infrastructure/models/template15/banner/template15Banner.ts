import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

import { BannerValues } from "./template15BannerValues"

@Schema({ _id: false })
export class Template15Banner {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true })
	"--color_pagination": string

	@Prop({ required: true })
	visible: string

	@Prop({ required: true, type: BannerValues, ref: BannerValues.name })
	values: BannerValues
}

export const Template15BannerSchema = SchemaFactory.createForClass(Template15Banner)
