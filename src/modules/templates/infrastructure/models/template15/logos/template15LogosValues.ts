import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15LogosValues {
	@Prop({ required: true })
	img: string

	@Prop({ required: true })
	url_redirect: string
}

export const Template15LogosValuesSchema = SchemaFactory.createForClass(Template15LogosValues)
