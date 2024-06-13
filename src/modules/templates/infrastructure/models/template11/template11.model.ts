import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ObjectId } from "mongoose"

@Schema({ collection: "template11" })
export class Template11Model {
	_id: ObjectId

	@Prop({ type: Object, required: false })
	header: Record<string, object>

	@Prop({ type: Object, required: false })
	pages: Record<string, object>

	@Prop({ type: Object, required: false })
	banner: Record<string, object>

	@Prop({ type: Object, required: false })
	section: Record<string, object>

	@Prop({ type: Object, required: false })
	trending: Record<string, object>

	@Prop({ type: Object, required: false })
	cardProduct: Record<string, object>

	@Prop({ type: Object, required: false })
	parallax: Record<string, object>

	@Prop({ type: Object, required: false })
	information: Record<string, object>

	@Prop({ type: Object, required: false })
	blog: Record<string, object>

	@Prop({ type: Object, required: false })
	newsletter: Record<string, object>

	@Prop({ type: Object, required: false })
	footer: Record<string, object>

	@Prop({ type: Object, required: false })
	contact: Record<string, object>

	@Prop({ type: Object, required: false })
	productList: Record<string, object>

	@Prop({ type: Object, required: false })
	detailsProduct: Record<string, object>

	@Prop({ type: Object, required: false })
	settingGeneral: Record<string, object>
}

export const Template11Schema = SchemaFactory.createForClass(Template11Model)
