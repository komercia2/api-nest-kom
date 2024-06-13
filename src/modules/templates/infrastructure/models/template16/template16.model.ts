import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ObjectId } from "mongoose"

@Schema({ collection: "template16" })
export class Template16Model {
	_id: ObjectId

	@Prop({ type: Object, required: false })
	header: Record<string, object>

	@Prop({ type: Object, required: false })
	banner: Record<string, object>

	@Prop({ type: Object, required: false })
	content: Record<string, object>

	@Prop({ type: Object, required: false })
	information: Record<string, object>

	@Prop({ type: Object, required: false })
	detailsProducts: Record<string, object>

	@Prop({ type: Object, required: false })
	cardProducts: Record<string, object>

	@Prop({ type: Object, required: false })
	pageHeader: Record<string, object>

	@Prop({ type: Object, required: false })
	offers: Record<string, object>

	@Prop({ type: Object, required: false })
	listProductsHome: Record<string, object>

	@Prop({ type: Object, required: false })
	informationStore: Record<string, object>

	@Prop({ type: Object, required: false })
	newsletter: Record<string, object>

	@Prop({ type: Object, required: false })
	listBlogHome: Record<string, object>

	@Prop({ type: Object, required: false })
	cardBlog: Record<string, object>

	@Prop({ type: Object, required: false })
	logos: Record<string, object>

	@Prop({ type: Object, required: false })
	footer: Record<string, object>

	@Prop({ type: Object, required: false })
	listProductsFilter: Record<string, object>

	@Prop({ type: Object, required: false })
	categories: Record<string, object>

	@Prop({ type: Object, required: false })
	contact: Record<string, object>

	@Prop({ type: Object, required: false })
	settingsGeneral: Record<string, object>
}

export const Template16Schema = SchemaFactory.createForClass(Template16Model)
