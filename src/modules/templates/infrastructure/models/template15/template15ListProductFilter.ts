import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15ListProductFilter {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true })
	img: string

	@Prop({ required: true })
	color_breadCrumbs: string

	@Prop({ required: true })
	visible_img: boolean

	@Prop({ required: true })
	color_title: string

	@Prop({ required: true })
	"--color_categories": string

	@Prop({ required: true })
	"--color_subCategories": string

	@Prop({ required: true })
	"--color_icon": string

	@Prop({ required: true })
	"--color_border": string

	@Prop({ required: true })
	"--color_pagination": string
}

export const Template15ListProductFilterSchema = SchemaFactory.createForClass(
	Template15ListProductFilter
)
