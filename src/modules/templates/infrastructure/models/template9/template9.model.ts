import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ObjectId } from "mongoose"

@Schema({ collection: "template9" })
export class Template9Model {
	_id: ObjectId

	@Prop({ type: Object, required: false })
	header: Record<string, object>

	@Prop({ type: Object, required: false })
	footer: Record<string, object>

	@Prop({ type: Object, required: false })
	banner: Record<string, object>

	@Prop({ type: Object, required: false })
	koffers: Record<string, object>

	@Prop({ type: Object, required: false })
	productList: Record<string, object>

	@Prop({ type: Object, required: false })
	cardProduct: Record<string, object>

	@Prop({ type: Object, required: false })
	blog: Record<string, object>

	@Prop({ type: Object, required: false })
	wrapper: Record<string, object>

	@Prop({ type: Object, required: false })
	newsletter: Record<string, object>

	@Prop({ type: Object, required: false })
	productListFilter: Record<string, object>

	@Prop({ type: Object, required: false })
	contact: Record<string, object>

	@Prop({ type: Object, required: false })
	detailsProduct: Record<string, object>

	@Prop({ type: Object, required: false })
	settingGeneral: Record<string, object>
}

export const Template9Schema = SchemaFactory.createForClass(Template9Model)
