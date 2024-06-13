import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ObjectId } from "mongoose"

@Schema({ collection: "template13" })
export class Template13Model {
	_id: ObjectId

	@Prop({ type: Object, required: false })
	header: Record<string, object>

	pages: Record<string, object>

	@Prop({ type: Object, required: false })
	banner: Record<string, object>

	@Prop({ type: Object, required: false })
	cardProduct: Record<string, object>

	@Prop({ type: Object, required: false })
	information: Record<string, object>

	@Prop({ type: Object, required: false })
	newsletter: Record<string, object>

	@Prop({ type: Object, required: false })
	footer: Record<string, object>

	@Prop({ type: Object, required: false })
	contact: Record<string, object>

	@Prop({ type: Object, required: false })
	productList: Record<string, object>

	@Prop({ type: Object, required: false })
	productListFilter: Record<string, object>

	@Prop({ type: Object, required: false })
	settingGeneral: Record<string, object>

	@Prop({ type: Object, required: false })
	detailsProduct: Record<string, object>

	@Prop({ type: Object, required: false })
	infoText: Record<string, object>
}

export const Template13Schema = SchemaFactory.createForClass(Template13Model)
