import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"

import { Template6BannerValuesModel } from "./template6-banner-values-model"

@Schema({ _id: false })
export class Template6BannerModel {
	@Prop({ required: false })
	subtitle: string

	@Prop({ required: true })
	title: string

	@Prop({ required: true })
	color_subTitle: string

	@Prop({ required: true })
	color_title_main: string

	@Prop({ required: true })
	color_description: string

	@Prop({ required: true })
	color_title: string

	@Prop({ required: false })
	img_main: string

	@Prop({ required: false })
	img_second_1: string

	@Prop({ required: false })
	img_second_2: string

	@Prop({
		required: true,
		type: Types.Array<Template6BannerValuesModel>,
		ref: Template6BannerValuesModel.name
	})
	values: Template6BannerValuesModel[]
}

export const Template6BannerSchema = SchemaFactory.createForClass(Template6BannerModel)
