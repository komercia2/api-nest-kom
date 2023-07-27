import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ _id: false })
export class Template15PageHeader {
	@Prop({ required: true, type: String })
	displayName: string

	@Prop({ required: true, type: Boolean })
	isExternalLink: boolean

	@Prop({ required: true, type: Number })
	tipo: number

	@Prop({ required: true, type: String })
	url: string
}

export const Template15PageHeaderSchema = SchemaFactory.createForClass(Template15PageHeader)
