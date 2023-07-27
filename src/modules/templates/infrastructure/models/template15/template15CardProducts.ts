import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15CardProducts {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true })
	color_title: string

	@Prop({ required: true })
	color_price: string

	@Prop({ required: true })
	fontWeighTitle: number

	@Prop({ required: true })
	fontWeighPrice: number

	@Prop({ required: true })
	color_icon: string

	@Prop({ required: true })
	color_btn: string

	@Prop({ required: true })
	color_border: string
}

export const Template15CardProductsSchema = SchemaFactory.createForClass(Template15CardProducts)
