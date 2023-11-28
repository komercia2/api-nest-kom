import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template6BannerValuesModel {
	@Prop({ required: true })
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
}

export const Template6BannerValuesSchema = SchemaFactory.createForClass(Template6BannerValuesModel)
