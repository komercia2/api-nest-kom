import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ObjectId } from "mongoose"

@Schema({ collection: "template14" })
export class Template14Model {
	_id: ObjectId

	@Prop({ type: Object, required: false })
	header: Record<string, object>

	@Prop({ type: Object, required: false })
	banner: Record<string, object>

	@Prop({ type: Object, required: false })
	information: Record<string, object>

	@Prop({ type: Object, required: false })
	detailsProducts: Record<string, object>

	@Prop({ type: Object, required: false })
	pages: Record<string, object>

	@Prop({ type: Object, required: false })
	cardProducts: Record<string, object>

	@Prop({ type: Object, required: false })
	offers: Record<string, object>

	@Prop({ type: Object, required: false })
	listProductsHome: Record<string, object>

	@Prop({ type: Object, required: false })
	offersProduct: Record<string, object>

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
	contact: Record<string, object>

	@Prop({ type: Object, required: false })
	settingsGeneral: Record<string, object>
}

export const Template14Schema = SchemaFactory.createForClass(Template14Model)
