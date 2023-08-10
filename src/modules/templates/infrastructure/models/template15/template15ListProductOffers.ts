import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Template15ListProductsOffers {
	@Prop({ required: true })
	"--background_color_1": string

	@Prop({ required: true, type: Boolean })
	visible: boolean

	@Prop({ required: true })
	title: string

	@Prop({ required: true })
	color_title_1: string

	@Prop({ required: true })
	fontWeighTitle: number
}

export const ListProductsOffersSchema = SchemaFactory.createForClass(Template15ListProductsOffers)
