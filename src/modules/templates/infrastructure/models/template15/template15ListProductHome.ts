import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15ListProductsHome {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true, type: Boolean })
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
	fontWeighTitle: number
}

export const Template15ListProductsHomeSchema = SchemaFactory.createForClass(
	Template15ListProductsHome
)
